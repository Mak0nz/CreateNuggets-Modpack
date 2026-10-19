StartupEvents.registry("entity_type", (event) => {
  event
    .create("kubejs:mission_npc", "entityjs:mob")
    .clientTrackingRange(20)
    .mobCategory("creature")
    .sized(0.6,2)
    .isInvulnerableTo((context) => true)
    
    .tick((entity) => {
      try {
        // CLIENT: vanilla only turns a stationary mob's head, and only drags the body
        // along once the head is ~75 degrees off. The head yaw is synced from the server,
        // so copy it onto the body and the whole model turns.
        // (Uses the public yHeadRot / yBodyRot fields; getYRot() isn't callable here.)
        if (entity.level.clientSide) {
          entity.yBodyRot = entity.yHeadRot;
          return;
        }
 
        // SERVER: turn toward the nearest player within 6 blocks
        let player = entity.level.getNearestPlayer(entity.x, entity.y, entity.z, 6, false);
        if (!player) return;
 
        // Minecraft yaw: 0 = south (+Z), -90 = east (+X), 90 = west, 180 = north
        let dx = player.x - entity.x;
        let dz = player.z - entity.z;
        let target = (Math.atan2(dz, dx) * 180) / Math.PI - 90;
 
        let current = entity.yHeadRot;
        if (typeof current !== "number" || isNaN(current)) {
          throw new Error("yHeadRot isn't readable (got " + typeof current + "). Rotation-related members: " + rotationMembers(entity));
        }
 
        // Shortest signed angle to the target, capped at 20 degrees per tick
        let diff = target - current;
        diff -= 360 * Math.floor((diff + 180) / 360);
        let yaw = current + Math.max(-20, Math.min(20, diff));
 
        entity.yHeadRot = yaw;
        entity.yBodyRot = yaw;
      } catch (error) {
        // Log once, not once per tick
        if (!missionNpcTickErrorLogged) {
          missionNpcTickErrorLogged = true;
          console.error("[mission_npc] tick failed: " + error);
        }
      }
    })
 
    .onInteract((context) => {
      let player = context.player;
      let npc = context.entity;
      let hand = context.hand;
 
      if (hand.toString().toUpperCase() !== "MAIN_HAND") return;
 
      npc.triggerAnimation("missionNpcController", "interactID");
    })


    .animationResource((entity) => {
      return "kubejs:animations/entity/mission_npc.animation.json";
    })
    .addAnimationController("missionNpcController", 1, (event) => {
      event.addTriggerableAnimation("interact", "interactID", "default");

      if (!event.isMoving()) {
        event.thenLoop("idle");
      }

      return true;
    })
});

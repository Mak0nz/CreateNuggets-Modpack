// Depending on the KubeJS/Rhino build, server.overworld can be exposed as a *method*
// instead of a property. `server.overworld ? server.overworld : ...` then hands you the
// method object itself (it's truthy), and the next line throws. This handles both.
function getOverworld(server) {
  let level = server.overworld;
  if (typeof level === "function") level = server.overworld();
  return level;
}

function spawnQuestNpc(level, x, y, z) {
  let npc = level.createEntity("kubejs:mission_npc");
  npc.setPosition(x, y, z);

  npc.mergeNbt({
    PersistenceRequired: 1,
    CustomName: '{"text":"Netahaquests","color":"gold"}',
    CustomNameVisible: 1,
  });

  npc.spawn();
  return npc;
}

// Admin Spawn Command
ServerEvents.commandRegistry((event) => {
  const { commands } = event;
  event.register(
    commands
      .literal("spawnquestnpc")
      .requires((source) => source.hasPermission(2))
      .executes((context) => {
        try {
          let source = context.source;
          if (!source.isPlayer()) return 0;

          let player = source.player;
          spawnQuestNpc(player.level, player.x, player.y, player.z);

          player.tell(Component.green("Quest NPC spawned at your location!"));
          return 1;
        } catch (error) {
          context.source.player.tell(Component.red("Error: " + error));
          console.error("NPC Spawn Error: " + error);
          return 0;
        }
      }),
  );
});

// Auto-spawn once per world.
const QUEST_NPC_FLAG = "quest_npc_spawned";

function ensureWorldQuestNpc(server) {
  // server.persistentData is saved with the world and is the documented place for this
  let data = server.persistentData;
  if (data.getBoolean(QUEST_NPC_FLAG)) return;

  let level = getOverworld(server);
  let spawnPos = level.sharedSpawnPos;
  let x = spawnPos.x + 0.5;
  let y = spawnPos.y + 1;
  let z = spawnPos.z + 0.5;

  spawnQuestNpc(level, x, y, z);

  // Only reached if the spawn call didn't throw
  data.putBoolean(QUEST_NPC_FLAG, true);
  console.info(`Quest NPC auto-spawned at ${x}, ${y}, ${z}`);
}

// ServerEvents.loaded fires on server start AND on /reload; the flag keeps it to one NPC.
ServerEvents.loaded((event) => {
  let server = event.server;

  // Wait ~2 seconds so the spawn chunks are ready before adding an entity.
  server.scheduleInTicks(40, () => {
    try {
      ensureWorldQuestNpc(server);
    } catch (error) {
      console.error("Auto-Spawn Error: " + error);
    }
  });
});

// Open the missions menu when a player right-clicks the NPC
ItemEvents.entityInteracted((event) => {
  if (event.target.type !== "kubejs:mission_npc") return;
  if (event.hand.toString().toUpperCase() !== "MAIN_HAND") return;

  try {
    // Console permissions, so this works even once /missions is op-only
    event.server.runCommandSilent(`execute as ${event.player.username} run missions`);
  } catch (error) {
    console.error("[mission_npc] couldn't run /missions: " + error);
  }
});
EntityEvents.death((event) => {
  const entity = event.entity;
  if (entity.type !== "minecraft:ender_dragon") return;

  const level = entity.level;
  const itemEntity = level.createEntity("item");
  itemEntity.x = 0.5;
  itemEntity.y = 70;
  itemEntity.z = 0.5;
  itemEntity.item = Item.of("minecraft:dragon_egg");
  itemEntity.spawn();
});

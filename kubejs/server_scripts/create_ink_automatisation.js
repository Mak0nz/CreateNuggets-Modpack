ServerEvents.recipes((event) => {
  event.recipes.create.compacting("2x minecraft:ink_sac", [
    Fluid.of("minecraft:water", 100),
    Ingredient.of("minecraft:dried_kelp"),
    Ingredient.of("#c:coal"),
  ]);
});

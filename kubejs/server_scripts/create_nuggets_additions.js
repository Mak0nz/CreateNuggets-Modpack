ServerEvents.recipes((event) => {
  event.shapeless("minecraft:cobbled_deepslate", "9x minecraft:cobblestone");

  event.shapeless("minecraft:dirt", "9x createaddition:biomass");

  event
    .shaped("rsinfinitybooster:dimension_card", ["ERE", "RDR", "NNN"], {
      E: "minecraft:ender_eye",
      R: "refinedstorage:range_upgrade",
      D: "minecraft:dragon_head",
      N: "minecraft:netherite_ingot",
    })
    .id("rsinfinitybooster:dimension_card");

  event.shapeless(
    "4x minecraft:pointed_dripstone",
    "minecraft:dripstone_block",
  );

  event.shapeless("biomesoplenty:white_sand", [
    "minecraft:sand",
    "minecraft:white_dye",
  ]);

  event.shapeless("biomesoplenty:black_sand", [
    "minecraft:sand",
    "minecraft:black_dye",
  ]);

  event.shapeless("biomesoplenty:orange_sand", [
    "minecraft:sand",
    "minecraft:orange_dye",
  ]);

  event.shapeless("biomesoplenty:orange_sand", [
    "minecraft:sand",
    "minecraft:red_sand",
  ]);

  event.shapeless("createdeco:industrial_iron_bars", [
    "createdeco:industrial_iron_bars_overlay",
  ]);
});

MoreJS.villagerTrades((event) => {
  event.removeTrades({ output: "ars_nouveau:warp_scroll" });
});

ServerEvents.recipes((event) => {
  event
    .shapeless("ars_nouveau:warp_scroll", [
      "4x alexsmobs:mimicream",
      "ars_nouveau:blank_parchment",
      "4x #c:gems/source",
    ])
    .id("ars_nouveau:warp_scroll");

  event.recipes.ars_nouveau
    .enchanting_apparatus(
      [
        "minecraft:blaze_powder",
        "minecraft:blaze_powder",
        "minecraft:blaze_powder",
        "minecraft:blaze_powder",
        "minecraft:nether_star",
        "minecraft:nether_star",
      ],
      "ars_nouveau:warp_scroll",
      "ars_nouveau:stable_warp_scroll",
      0,
    )
    .id("ars_nouveau:stable_warp_scroll");
});

BlockEvents.rightClicked((event) => {
  const item = event.item;
  if (!item || item.id !== "ars_nouveau:stable_warp_scroll") return;

  const player = event.player;
  const nextDamage = item.getDamageValue() + 1;

  if (nextDamage >= item.getMaxDamage()) {
    item.shrink(1);
    player.tell("§cYour Relarp Scroll crumbles to dust after one final use!");
  } else {
    item.setDamageValue(nextDamage);
  }
});

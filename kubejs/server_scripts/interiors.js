// patches for c: interiors until mod gets update with recipes fix
ServerEvents.recipes((event) => {
  event.shapeless("interiors:kelp_seat", [
    "#minecraft:wooden_slabs",
    "create:belt_connector",
  ]);

  event.shapeless("interiors:kelp_floor_chair", [
    "#minecraft:wooden_slabs",
    "interiors:kelp_seat",
  ]);

  event.shapeless("interiors:kelp_floor_chair", [
    "#minecraft:wooden_slabs",
    "#minecraft:wooden_slabs",
    "create:belt_connector",
  ]);

  event.shapeless("interiors:kelp_chair", [
    "#minecraft:planks",
    "interiors:kelp_seat",
  ]);

  event.shapeless("interiors:kelp_chair", [
    "#minecraft:wooden_slabs",
    "interiors:kelp_floor_chair",
  ]);

  event.shapeless("interiors:kelp_chair", [
    "#minecraft:wooden_slabs",
    "#minecraft:planks",
    "create:belt_connector",
  ]);
});

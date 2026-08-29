// patches for chairs/seats not working on trains
ServerEvents.tags("block", (event) => {
  event.add(
    "create:seats",
    "#bits_n_bobs:chairs",
    "#interiors:chairs",
    "#interiors:floor_chairs",
    "interiors:kelp_chair",
    "interiors:kelp_floor_chair",
    "interiors:kelp_seat",
  );
});

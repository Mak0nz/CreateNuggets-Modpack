// Visit the wiki for more info - https://kubejs.com/
console.info("Hello, CreateNuggets World! (Loaded startup)");

ItemEvents.modification((event) => {
  event.modify("ars_nouveau:stable_warp_scroll", (item) => {
    item.maxDamage = 32; // teleports before it breaks
  });
});

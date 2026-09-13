ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(
    Commands.literal("cleanse").executes((ctx) => {
      const player = ctx.source.getPlayerOrException();

      // Run as the server console internally, so it works regardless of the player's permission level
      player.server
        .getCommands()
        .performPrefixedCommand(
          player.server.createCommandSourceStack(),
          `effect clear ${player.username} slowness`,
        );

      player.tell(Text.green("Slowness cleared!"));
      return 1;
    }),
  );
});

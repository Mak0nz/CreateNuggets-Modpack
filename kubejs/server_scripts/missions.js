// Makes /missions (and everything under it) require op level 2, which also hides it
// from chat suggestions for everyone else. The NPC still works because
// player.server.runCommandSilent("execute as <player> run missions") runs with console
// permissions, and `execute as` keeps them.
//
// Brigadier can't change a node's requirement in place, so we rebuild the node with an
// op-only requirement (reusing the original executor and subcommands) and swap it in.

const $Commands = Java.loadClass("net.minecraft.commands.Commands");

function lockMissionsCommand(server) {
  let commands = server.commands;
  let root = commands.dispatcher.root;
  let original = root.getChild("missions");

  if (!original) {
    console.warn("[missions lock] No /missions command found. Is Brassworks Missions loaded?");
    return;
  }

  let locked = $Commands.literal("missions").requires((src) => src.hasPermission(2));
  if (original.command) locked.executes(original.command);
  original.children.forEach((child) => locked.then(child));

  // getChildren() is a live view of the root's child map, so this removes the old node;
  // adding the new one then also overwrites the matching entry in the literal lookup.
  root.children.removeIf((node) => node.name == "missions");
  root.addChild(locked.build());

  // Push the updated command tree to anyone already online
  server.players.forEach((player) => commands.sendCommands(player));

  console.info("[missions lock] /missions is now op-only (the NPC still triggers it)");
}

// Fires on server start and on /reload, i.e. after every mod's commands are registered.
ServerEvents.loaded((event) => {
  try {
    lockMissionsCommand(event.server);
  } catch (error) {
    console.error("[missions lock] " + error);
  }
});
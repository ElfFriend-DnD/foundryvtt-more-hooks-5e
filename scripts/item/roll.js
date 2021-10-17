import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRoll() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.roll", rollPatch, "WRAPPER");
}

async function rollPatch(wrapper, options, ...rest) {
  const chatMessage = await wrapper(options, ...rest);

  const itemUuid = this.uuid;
  const actorUuid = this.actor?.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(roll, itemUuid, chatMessage, cleanedOptions, actorUuid);

  return chatMessage;
}

/**
 * A hook event that fires after an Item is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {ChatMessage|object} chatMessage       The created ChatMessage or ChatMessageData depending on options.createMessage
 * @param {object} [options]
 * @param {boolean} [options.configureDialog]     Display a configuration dialog for the item roll, if applicable?
 * @param {string} [options.rollMode]             The roll display mode with which to display (or not) the card
 * @param {boolean} [options.createMessage]       Whether to automatically create a chat message (if true) or simply return
 */
export async function roll(itemUuid, chatMessage, options, actorUuid) {
  const item = await fromUuid(itemUuid);

  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  Hooks.callAll('Item5e.roll', item, chatMessage, options, actor);
}
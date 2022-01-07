import { MODULE_NAME } from "../const.js";

export function patchRoll() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.roll", rollPatch, "WRAPPER");
}

async function rollPatch(wrapper, options, ...rest) {
  const chatMessage = await wrapper(options, ...rest);

  if (!chatMessage) return chatMessage;

  const item = this;
  const actor = this.actor;

  Hooks.callAll('Item5e.roll', item, chatMessage, options, actor);

  return chatMessage;
}

/**
 * A hook event that fires after an Item is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {ChatMessage|object} chatMessage       The created ChatMessage or ChatMessageData depending on options.createMessage
 * @param {object} [options]
 * @param {boolean} [options.configureDialog]     Display a configuration dialog for the item roll, if applicable?
 * @param {string} [options.rollMode]             The roll display mode with which to display (or not) the card
 * @param {boolean} [options.createMessage]       Whether to automatically create a ChatMessage document (if true), or only return the prepared message data (if false)
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
function roll() { }  

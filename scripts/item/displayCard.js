import { MODULE_NAME } from "../const.js";

export function patchDisplayCard() {
  libWrapper.register(MODULE_NAME, "CONFIG.Item.documentClass.prototype.displayCard", displayCardPatch, "WRAPPER");
}

async function displayCardPatch(wrapper, options, ...rest) {
  const chatMessage = await wrapper(options, ...rest);

  const item = this;
  const actor = this.actor;

  Hooks.callAll('Item5e.displayCard', item, chatMessage, options, actor);

  return chatMessage;
}

/**
 * A hook event that fires after an Item is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {ChatMessage|object} chatMessage       The created ChatMessage or ChatMessageData depending on options.createMessage
 * @param {object} [options]
 * @param {boolean} [options.rollMode]     The message visibility mode to apply to the created card
 * @param {string} [options.createMessage]             Whether to automatically create a ChatMessage entity (if true), or only return the prepared message data (if false)
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
function displayCard() { }

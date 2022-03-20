import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preDisplayCardPatch = `
if (this instanceof CONFIG.Item.documentClass && !!chatData) {
  const allowed = Hooks.call('Item5e.preDisplayCard', this, chatData);
  if ( allowed === false ) return null;
}

const message = createMessage ? await ChatMessage.create(chatData) : chatData;

if (this instanceof CONFIG.Item.documentClass && !!message) {
  Hooks.callAll('Item5e.displayCard', this, message);
}

return message;
`;

export function jankyPatchDisplayCard() {
  try {
    const newFnString = jankyPatch(Item5e.prototype.displayCard.toString(), {
      firstLineString: "displayCard({rollMode, createMessage=true}={}) {\n",
      regex: /return createMessage \? ChatMessage.create\(chatData\) : chatData;/,
      patch: preDisplayCardPatch,
    });
  
    Item5e.prototype.displayCard =  new AsyncFunction("{rollMode, createMessage=true}={}", newFnString);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "displayCard":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item Roll's chat message is created
 * @param {Item5e} item       The Item being rolled
 * @param {object} chatData  The data that will be provided to the ChatMessage
 */
 function preDisplayCard() { }

/**
 * A hook event that fires after an Item Roll's chat message is created
 * @param {Item5e} item       The Item being rolled
 * @param {ChatMessage|object} chatMessage       The created ChatMessage instance or ChatMessageData depending on options.createMessage
 */
function displayCard() { }

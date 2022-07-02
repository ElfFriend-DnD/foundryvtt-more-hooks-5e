import Item5e from '../../../../systems/dnd5e/module/item/entity.js';
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";

const preItemRollPatch = `
if (item instanceof CONFIG.Item.documentClass) {
  const allowed = Hooks.call(
    'Item5e.preRoll',
    this,
    { configureDialog, rollMode, createMessage },
    { createMeasuredTemplate, consumeRecharge, consumeResource, consumeSpellSlot, consumeUsage },
  );
  if ( allowed === false ) return;
}

// Display a configuration dialog to customize the usage
const needsConfiguration =
  createMeasuredTemplate || consumeRecharge || consumeResource || consumeSpellSlot || consumeUsage;

if (configureDialog && needsConfiguration) {
  const configuration = await game.dnd5e.applications.AbilityUseDialog.create(this);
`;


const preRollConsumptionPatch = `
const usageParameters = {
  consumeRecharge, consumeResource, consumeSpellLevel, consumeUsage, consumeQuantity
};

if (item instanceof CONFIG.Item.documentClass) {
  const allowed = Hooks.call('Item5e.preRollConsumption', item, usageParameters);
  if ( allowed === false ) return;
}

// Determine whether the item can be used by testing for resource consumption
const usage = item._getUsageUpdates(usageParameters);
`;


const postRollPatch = `
// Create or return the Chat Message data
const chatMessage = await item.displayCard({rollMode, createMessage});

if (item instanceof CONFIG.Item.documentClass) {
  Hooks.callAll('Item5e.roll', item, chatMessage);
}

return chatMessage;
`;

export function jankyPatchRoll() {
  try {
    const withPreRollHook = jankyPatch(Item5e.prototype.roll.toString(), {
      firstLineString: "async roll({configureDialog=true, rollMode, createMessage=true}={}) {\n",
      regex: /\/\/ Display a configuration dialog to customize the usage(\s|.)+?AbilityUseDialog.create\(this\);/,
      patch: preItemRollPatch,
    });
  
    const withPreRollHookFn = new AsyncFunction("{configureDialog=true, rollMode, createMessage=true}={}", withPreRollHook);

    const withPreRollConsumptionHook = jankyPatch(withPreRollHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /\/\/ Determine whether the item can be used by testing for resource consumption(\s|.)+?\}\);/,
      patch: preRollConsumptionPatch,
    });
  
    const withPreRollConsumptionHookFn = new AsyncFunction("{configureDialog=true, rollMode, createMessage=true}={}", withPreRollConsumptionHook);


    const withPreAndPostHook = jankyPatch(withPreRollConsumptionHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /\/\/ Create or return the Chat Message data(\s|.)+?\}\);/,
      patch: postRollPatch,
    });

    Item5e.prototype.roll =  new AsyncFunction("{configureDialog=true, rollMode, createMessage=true}={}", withPreAndPostHook);
  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "roll":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Item's roll workflow begins. This happens before the Ability Use Dialog is shown.
 * @param {Item5e} item       The Item that rolls the Attack Roll
 * @param {object} options     The options passed to the Item.roll method.
 * @param {boolean} [options.configureDialog]     Display a configuration dialog for the item roll, if applicable?
 * @param {string} [options.rollMode]             The roll display mode with which to display (or not) the card
 * @param {boolean} [options.createMessage]       Whether to automatically create a chat message (if true) or simply
 * @param {object} usageParameters       Usage Parameters that will create the Ability use Dialog. These can change what the user is prompted for during the ability use dialog.
 * @param {boolean} usageParameters.consumeRecharge       Should the item consume its recharge?
 * @param {boolean} usageParameters.consumeResource       Should the item consume the configured resource item?
 * @param {boolean} usageParameters.consumeSpellSlot       Should the item consume a spell slot?
 * @param {boolean} usageParameters.consumeUsage       Should the item consume the configured charges?
 * @param {boolean} usageParameters.consumeQuantity       Should the item consume its own quantity?
 */
function preRoll() { }

/**
 * A hook event that fires before an Item's usage updates are calculated.
 * @param {Item5e} item       The Item that rolls the Attack Roll
//  * @param {object} usageParameters      Usage Parameters from the Ability use Dialog. These are passed into Item5e._getUsageUpdates to determine the actor and item changes to be committed.
 * @param {boolean} usageParameters.consumeRecharge       Should the item consume its recharge?
 * @param {boolean} usageParameters.consumeResource       Should the item consume the configured resource item?
 * @param {string} usageParameters.consumeSpellLevel       What level spell should the item consume? This should be either 'pact' or 'spell1', 'spell2', etc
 * @param {boolean} usageParameters.consumeUsage       Should the item consume the configured charges?
 * @param {boolean} usageParameters.consumeQuantity       Should the item consume its own quantity?
 */
 function preRollConsumption() { }

/**
 * A hook event that fires after an Item is rolled
 * @param {Item5e} item       The Item being rolled
 * @param {ChatMessage|object} chatMessage       The created ChatMessage or ChatMessageData depending on options.createMessage
 */
function roll() { }

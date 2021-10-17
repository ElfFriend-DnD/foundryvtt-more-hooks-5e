import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollDamage() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Item.documentClass.prototype.rollDamage', rollDamagePatch, "WRAPPER");
}

async function rollDamagePatch(wrapper, config, ...rest) {
  const result = await wrapper(config, ...rest);

  const itemUuid = this.uuid;
  const actorUuid = this.actor?.uuid;
  const cleanedConfig = prepareOptions(config);

  socket.executeForEveryone(rollDamage, itemUuid, result, cleanedConfig, actorUuid);

  return result;
}

export async function rollDamage(itemUuid, result, cleanedConfig, actorUuid) {

  const item = await fromUuid(itemUuid);

  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.DamageRoll.fromData(result);

  /**
   * A hook event that fires after an Item rolls a Damage Roll
   * @function Item5e.rollDamage
   * @memberof itemHooks
   * @param {Item5e} item       The Item that rolls the Damage Roll
   * @param {DamageRoll} result           The Result of the Damage Roll
   * @param {object} [config]
   * @param {object} [config.event]    The event which triggered this roll, if any
   * @param {boolean} [config.critical]    Should damage be rolled as a critical hit?
   * @param {number} [config.spellLevel]   If the item is a spell, override the level for damage scaling
   * @param {boolean} [config.versatile]   If the item is a weapon, roll damage using the versatile formula
   * @param {object} [config.options]      Additional options passed to the damageRoll function
   * @param {Actor5e} [actor]       The Actor that owns the item
   */
  Hooks.callAll('Item5e.rollDamage', item, resultRoll, cleanedConfig, actor);
}

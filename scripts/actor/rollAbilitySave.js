import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollAbilitySave() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollAbilitySave', rollAbilitySavePatch, "WRAPPER");
}

async function rollAbilitySavePatch(wrapper, abilityId, options, ...rest) {
  const result = await wrapper(abilityId, options, ...rest);

  const actorUuid = this.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(rollAbilitySave, actorUuid, result, abilityId, cleanedOptions);

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Ability Save
 * @param {Actor5e} actor       The Actor that rolled the ability save
 * @param {D20Roll} result           The Result of the ability save
 * @param {string} abilityId      The ability id (e.g. "str")
 * @param {object} options      Options which configured how the ability save was rolled
 */
export async function rollAbilitySave(actorUuid, result, abilityId, cleanedOptions) {
  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  Hooks.callAll('Actor5e.rollAbilitySave', actor, resultRoll, abilityId, cleanedOptions);
}

import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollAbilityTest() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollAbilityTest', rollAbilityTestPatch, "WRAPPER");
}

async function rollAbilityTestPatch(wrapper, abilityId, options, ...rest) {
  const result = await wrapper(abilityId, options, ...rest);

  const actorUuid = this.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(rollAbilityTest, actorUuid, result, abilityId, cleanedOptions);

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Ability Test
 * @param {Actor5e} actor       The Actor that rolled the ability test
 * @param {D20Roll} result           The Result of the ability test
 * @param {string} abilityId      The ability id (e.g. "str")
 * @param {object} options      Options which configured how the ability test was rolled
 */
export async function rollAbilityTest(actorUuid, result, abilityId, cleanedOptions) {
  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  Hooks.callAll('Actor5e.rollAbilityTest', actor, resultRoll, abilityId, cleanedOptions);
}

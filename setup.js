import { MODULE_TITLE, MODULE_NAME } from "./scripts/const.js";
import { patchRollAbilitySave } from './scripts/actor/rollAbilitySave.js'
import { patchRollAbilityTest } from './scripts/actor/rollAbilityTest.js'
import { patchRollDeathSave } from './scripts/actor/rollDeathSave.js'
import { patchRollSkill } from './scripts/actor/rollSkill.js'
import { patchRollDamage } from './scripts/item/damageRoll.js'
import { patchRoll } from './scripts/item/roll.js'
import { patchDisplayCard } from './scripts/item/displayCard.js'
import { patchRollAttack } from './scripts/item/rollAttack.js'
import { patchRollFormula } from './scripts/item/rollFormula.js'
import { patchRollRecharge } from './scripts/item/rollRecharge.js'
import { patchRollToolCheck } from './scripts/item/rollToolCheck.js'

Hooks.on("setup", () => {
  console.log(`${MODULE_NAME} | Initializing ${MODULE_TITLE}`);
  // actor hooks
  patchRollAbilitySave();
  patchRollAbilityTest();
  patchRollDeathSave();
  patchRollSkill();

  // item hooks
  patchDisplayCard();
  patchRollDamage();
  patchRoll();
  patchRollAttack();
  patchRollFormula();
  patchRollRecharge();
  patchRollToolCheck();
});

import { patchApplyDamage } from "./scripts/actor/damageTaken.js";
import { patchRollAbilitySave } from './scripts/actor/rollAbilitySave.js';
import { patchRollAbilityTest } from './scripts/actor/rollAbilityTest.js';
import { patchRollDeathSave } from './scripts/actor/rollDeathSave.js';
import { patchRollSkill } from './scripts/actor/rollSkill.js';
import { MODULE_NAME, MODULE_TITLE } from "./scripts/const.js";
import { patchRollDamage } from './scripts/item/damageRoll.js';
import { patchDisplayCard } from './scripts/item/displayCard.js';
import { patchRoll } from './scripts/item/roll.js';
import { patchRollAttack } from './scripts/item/rollAttack.js';
import { patchRollFormula } from './scripts/item/rollFormula.js';
import { patchRollRecharge } from './scripts/item/rollRecharge.js';
import { patchRollToolCheck } from './scripts/item/rollToolCheck.js';

Hooks.on("setup", () => {
  console.log(`${MODULE_NAME} | Initializing ${MODULE_TITLE}`);
  // actor hooks
  patchApplyDamage();
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

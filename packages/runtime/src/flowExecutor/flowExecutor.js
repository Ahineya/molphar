import {evaluate} from "common/evaluator";
import {emailService} from "../services/email.service";

export function executeFlowSteps(steps, context) {
  for (let i = 0; i < steps.length; i++) {
    const currentStep = steps[i];

    if (currentStep.type === 'js') {
      try {
        eval(currentStep.code);
      } catch (e) {
        console.error(e, currentStep);
        return false;
      }
    }

    if (currentStep.type === 'email:send') {
      try {
        const to = evaluate(currentStep.email[0].clauses, context);
        console.log('SEND EMAIL TO:', to);
        emailService.send(to, 'test', 'Hello there!');
      } catch (e) {
        console.error(e, currentStep);
        return false;
      }
    }
  }
}

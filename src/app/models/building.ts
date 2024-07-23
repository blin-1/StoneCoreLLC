import { Address } from './address';
import { EcbViolation } from './ecb-violation';
import { Permit } from './permit';
import { Violation } from './violation';

export interface PropertyDetails {
  BIN?: string;
  PropertyViolation?: {
    ApprovalOnHold: 'N';
    BISViolation: 'N';
    BuyoutFlag: '';
    Class1Violation: '';
    CompromisedStructure: '';
    FilingOnHold: 'N';
    PadlockFlag: '';
    SandyDemoFlag: '';
    StopWork: '';
    VacateFlag: '';
    WithdrawalOnHold: 'N';
  };
}

export class Building {
  BIN: string = '';
  address: Address = new Address();
  violations: Array<Violation> = [];
  permits: Array<Permit> = [];
  ecbviolations: Array<EcbViolation> = [];
  details: PropertyDetails = {};

  constructor(bin: string) {
    this.BIN = bin;
    this.details.BIN = bin;
  }
}

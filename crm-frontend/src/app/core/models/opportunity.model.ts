export interface Opportunity {
  id: number;
  title: string;
  description?: string;
  amount: number;
  status: OpportunityStatus;
  clientId: number;
  createdAt: string;
  createdBy: string;
}

export enum OpportunityStatus {
  Lead = 'Lead',
  Qualified = 'Qualified',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  ClosedWon = 'ClosedWon',
  ClosedLost = 'ClosedLost'
}

export interface CreateOpportunityDto {
  title: string;
  description?: string;
  amount: number;
  status: OpportunityStatus;
  clientId: number;
}

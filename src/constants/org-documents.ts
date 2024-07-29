import { IDocumentType } from '../types/Common.type';

const ORG_DOCS: { [key: string]: IDocumentType } = {
  code_of_conduct: {
    key: 'code_of_conduct',
    title: `Code of Conduct (CoC)`,
    description: `Does the organisation have a Code of Conduct (CoC) and a system for reporting violations of the CoC?`,
    yesText: `Please upload`,
    noText: `Please explain how your organisation ensures that staff adhere to the organisation's values and what happens if they receive a complaint.`
  },
  child_protection_policy: {
    key: 'child_protection_policy',
    title: `PSEA Policy `,
    description: `Does the organisation have safeguarding including Child Protection and Protection Against Sexual Exploitation and Abuse (PSEA) policies?`,
    yesText: `Please upload`,
    noText: `Please explain how the organisation demonstrates commitment to protecting persons of concern against abuse, exploitation harassment and harm, regardless of gender, age, minority status, sexual orientation etc.`
  },
  anti_corruption_policy: {
    key: 'anti_corruption_policy',
    title: `Anti-Corruption Policy`,
    description: `Does the organisation have anti-corruption and conflict of interest policies and a system for reporting breaches to the policies?`,
    yesText: `Please upload`,
    noText: `Please explain how the organisation prevents corruption, what rules staff and management must abide by, and how to raise a concern. `
  },
  human_resources_policy: {
    key: 'human_resources_policy',
    title: `Human Resources Policy`,
    description: `Does the organisation have a human resources (HR) policy and staff manual, including principles for recruitment?	`,
    yesText: `Please upload`,
    noText: `Please explain how organisation fully abides by local laws related to employment: terms of employment, wages and benefits, recruitment and protection of personal data`
  },
  change_management_policy: {
    key: 'change_management_policy',
    title: `Project Monitoring and Adaptation`,
    description: `Does the organisation regularly conduct monitoring of projects, changes in context and needs, and adapt strategies and implementation accordingly? 	`,
    yesText: `Please upload evidence of regular monitoring of projects. This could include M&E manuals, plans, mid-term evaluations, recent reports, or other evidence of adaptation`,
    noText: `Please provide an explanation`
  },
  assessment_systems: {
    key: 'assessment_systems',
    title: `Assessment and Verification`,
    description: `Does the organisation have systems to carry out program assessments and verify activities?`,
    yesText: `Please upload a previous assessment and list any specific methodologies used in assessment`,
    noText: `Please provide an explanation`
  },
  feedback_mechanisms: {
    key: 'feedback_mechanisms',
    title: `Feedback Mechanisms`,
    description: `Does the organisation ensure feedback and participation in the project/programme cycle from affected populations?`,
    yesText: `Please upload evidence of feedback and participation mechanisms. This could include policies, manuals, project design, MEAL plan, programme/project documents, or community meeting minutes.`,
    noText: `Please provide an explanation`
  },
  coordination_with_other_actors: {
    key: 'coordination_with_other_actors',
    title: `Coordination with Other Actors`,
    description: `Is the organisation pursuing coordination with other actors, e.g. local authorities, clusters and technical working groups, the military? 	`,
    yesText: `Please provide an explanation and upload evidence of coordination with other actors`,
    noText: `Please provide an explanation`
  },
  health_safety_security_risk_assessment: {
    key: 'health_safety_security_risk_assessment',
    title: `Health, Safety and Security Risk Assessment`,
    description: `Are health, safety and security (HSS) risk assessments undertaken and updated regularly?	`,
    yesText: `Please upload HSS risk assessment documents, verification of adjustments made based on changes in the safety environment, safety policy if available, programme documents, etc.`,
    noText: `Please provide an explanation`
  },
  financial_management_guidelines: {
    key: 'financial_management_guidelines',
    title: `Financial Management Policy`,
    description: `Does the organisation have a set of guidelines/policies that guide financial management?	`,
    yesText: `Please upload finance policy, financial management guidelines, spot checks, list of inventory/fixed assets, or other evidence `,
    noText: `Please provide an explanation for how the organisation ensures sound financial management`
  },
  accounting_software: {
    key: 'accounting_software',
    title: `Accounting Software`,
    description: `Does the organisation have an accounting software/system in use to track and book-keep their financial transactions?	`,
    yesText: `Please provide information on the system in place, name of system, version used, what it can produce, who uses it and how user accesses is managed `,
    noText: `Please provide an explanation`
  },
  financial_accounts_audited: {
    key: 'financial_accounts_audited',
    title: `Audited Financials`,
    description: `Are financial accounts regularly audited by a certified external auditor?	`,
    yesText: `Please upload the most recent organisational audit report and one recent example of project audit reports, including explanation and verification of how recommendations have been addressed`,
    noText: `Please provide an explanation`
  },
  procurement_policy: {
    key: 'procurement_policy',
    title: `Procurement Policy`,
    description: `Does the organisation have a procurement policy?	`,
    yesText: `Please upload written procedures for managing procurement and assets`,
    noText: `Please explain why the organisation does not have a procurement policy`
  },
  counterterrorism_sanctions: {
    key: 'counterterrorism_sanctions',
    title: `Counterterrorism and Sanctions`,
    description: `Does the organisation have policies and procedures that enable it to be compliant with legal and donor requirements concerning counterterrorism and other types of sanctions, including systematic vetting of its implementing partners, staff and suppliers against all applicable sanctions lists?`,
    yesText: `Please provide or upload evidence that vetting is carried out consistently and systematically and that results are archived and available for control/audit purposes.`,
    noText: `Please provide an explanation as to why your organisation does not have a procedure in place.`
  },
  data_protection_laws: {
    key: 'data_protection_laws',
    title: `Data Protection`,
    description: `Does the organisation have policies and procedures to comply with GDPR and other applicable data protection laws?`,
    yesText: `Please upload written guidelines/policies such as Data Protection Policy, Storage, Retention, and Destruction guidelines, Disaster Recovery Plan, Third-party onboarding guidelines, job description of  data protection specialist adviser, or Breach Procedure`,
    noText: `Please explain other technical and safeguard mechanisms the organisation has in place for data protection, if any`
  },
  cyber_security: {
    key: 'cyber_security',
    title: `Cyber Security`,
    description: `Does the organisation have policies to ensure cyber security?	`,
    yesText: `Please upload cyber security policy, password policy, audit on cyber security, or job description of specialist IT staff`,
    noText: `Please provide an explanation`
  }
};

export default ORG_DOCS;

import { StaffType } from '../requests/Organizations/OrganizationsRequest.type';

export const SITE_LINKS = {
  social: {
    twitter: 'https://twitter.com/coalapay',
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    linkedin: 'https://www.linkedin.com/company/coalapay',
    location: 'https://google.com/maps'
  }
};

export const CHECKLIST = [
  { id: 1, text: 'KYC', checked: true },
  { id: 2, text: 'Submission of founding documents or charter', checked: false },
  { id: 3, text: 'Full background check of all staff and volunteers', checked: true },
  { id: 4, text: 'Offramp confirmation', checked: true },
  { id: 5, text: 'Completed activity audit', checked: true },
  { id: 6, text: 'Community consultation', checked: true }
];

export const TOAST_MESSAGES = {
  metamask: {
    not_installed_wallet:
      'Non-Ethereum browser extension detected. Please install or login to your Wallet',
    not_supported_network_mainnet: 'Network is not supported. Please switch to Mainnet.',
    not_supported_network_testnet: 'Network is not supported. Please switch to Sepolia Testnet.',
    user_rejected_request: 'Please authorize this website to access your Ethereum account.',
    unknown_error: 'An unknown error occurred. Please try again.'
  },
  project: {
    create_project_success: 'Successfully, your form has been submitted',
    update_project_success: 'Successfully, your form has been submitted',
    error_allow_upload_file_type: 'Only support upload files: JPG/JPEG/PNG/GIF file',
    error_allow_upload_file_size: 'Only support upload file size < 20MB'
  },
  organisation: {
    create_organisation_success:
      'Thank you for submitting your organisation’s due diligence information. You should receive an email confirming your submission. We will be in touch soon.',
    create_organisation_success_mexico:
      'Agradecemos que haya enviado la información de diligencia debida de su organización. Debería recibir un correo electrónico confirmando su envío. En breve nos pondremos en contacto con usted.',
    error_allow_upload_file_type:
      'Only support upload files: JPG/JPEG/GIF/SVG/MP4/MOV/PDF/DOCX/XLSX/XLS file',
    error_allow_upload_file_size: 'Only support upload file size < 50MB',
    edit_organization_success: (
      <>
        <strong>New details pending review.</strong>
        <br />
        Our team will review these changes and notify you when you are able to re-access your
        profile. Thanks for your patience!
      </>
    ),
    on_enter_docs:
      'In order to be eligible for NRC funding, you must respond to all queries on this page. Select the “Edit” button to enter your response. If you have the requested documents, please upload. If you do not, please provide an explanation. Documents and responses are saved as they are submitted so that you do not lose progress due to internet outages or low bandwidth.'
  },
  donor: {
    approve_donor_request_success: 'Successfully, donor request has been approved',
    reject_donor_request_success: 'Successfully, donor request has been rejected',
    donor_request_additional: 'Successfully, request additional has been submitted'
  },
  users: {
    create_donor_success: 'Successfully, donor has been created',
    import_donor_csv_success: 'Successfully, donor has been imported',
    import_donor_csv_error: 'Import error, please check your file again',
    create_request_access_success: 'We will review your request and get back to you shortly.'
  },
  squid: {
    disclaimer: (
      <>
        <br />
        <ul>
          <li>
            <p>Double check the destination address and chain</p>
          </li>
          <li>
            <p>{"Do not send money to anyone you don't know"}</p>
          </li>
          <li>
            <p>Coala Pay cannot help you recover funds if you send them to the wrong address</p>
          </li>
        </ul>
      </>
    )
  }
};

export const PAGINATES = {
  default: {
    pageSize: 18,
    pageIndex: 1
  },
  organisations: {
    adminOrgianisationList: {
      pageSize: 15
    },
    donorRequest: {
      pageSize: 15
    }
  },
  projects: {
    adminProjectsList: {
      pageSize: 15
    }
  },
  users: {
    adminUsersList: {
      pageSize: 15
    }
  },
  marketplaceAccess: {
    pageSize: 15
  }
};

export const API_ROOT = {
  v1: '/api/v1',
  v2: '/api/v2'
};

export const STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FUNDED: 'FUNDED',
  PENDING_REVIEW: 'PENDING_REVIEW'
};

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  ORG: 'ORG',
  DONOR: 'DONOR'
};

export const TIME_FORMAT = {
  DATE_TIME_12H: 'DD-MM-YYYY hh:mm A'
};

export const MEDIA_TYPES = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  UNKNOWN: 'UNKNOWN'
};

export const CHECKLIST_DUE_DILIGENCE = [
  'KYC (Know Your Customer)',
  'Submission of registration or other founding documents',
  'Submission of financial audit or other documents',
  'Full background check of leadership staff',
  'Community vetted',
  'Social Media Analysis',
  'Offramp confirmation'
];

export const KEY_STAFF_NAMES = {
  [StaffType.CEO]: 'Secretary General / CEO / Executive Director (or equivalent)',
  [StaffType.CFO]: 'Chief Finance Officer / Director of Finance or equivalent',
  [StaffType.CHAIR]: 'Chair of the Board of Directors'
};

export const KEY_STAFF_REQUIRING_IDENTIFICATION = [StaffType.CEO];

export const TYPE_MARKETPLACES = [
  {
    label: 'Public',
    value: 'PUBLIC'
  },
  {
    label: 'NRC Sudan',
    value: 'NRC_SUDAN'
  },
  {
    label: 'Myanmar',
    value: 'MYANMAR'
  },
  {
    label: 'Mexico',
    value: 'MEXICO'
  }
];

export const TYPE_MARKETPLACES_PRIVATE = [
  {
    label: 'NRC Sudan',
    value: 'NRC_SUDAN'
  },
  {
    label: 'Myanmar',
    value: 'MYANMAR'
  },
  {
    label: 'Mexico',
    value: 'MEXICO'
  }
];

export type FUNDING_TYPE = 'WALLET' | 'MTN' | 'GLOBAL_BLOCK';

export const ALLOWED_FILES_UPLOAD = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/svg',
  'image/webp',
  'video/mp4',
  'video/mov',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/excel',
  'application/vnd.ms-excel',
  'application/x-excel',
  'application/x-msexcel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/excel',
  'application/vnd.ms-excel',
  'application/x-excel',
  'application/x-msexcel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

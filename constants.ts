import { CompanyData } from './types';

export const COMPANY_DATA: CompanyData = {
  departments: [
    {
      id: 1,
      name: "Enterprise Department",
      icon: "building",
      color: "blue",
      sections: [
        {
          id: "enterprise_ftth",
          name: "Enterprise Fiber (FTTH)",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://enterprise-fiber-b51m.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/1jkX663WP-k2uoSbaJBbBBge5qPQlJ7RN?showPreview=true&showAssistant=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/enterprise-fiber-b51m/5MrY7nYQv7kpdiFnDLUvwWmb9bqc" }
          ]
        },
        {
          id: "enterprise_wireless",
          name: "Enterprise Wireless",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://enterprise-wirless.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/1BtSAYuguQ6CffkMLjgijF1npmKTB0Ggv?showPreview=true&showAssistant=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/enterprise-wirless/FzJpSfZkoupEyXUP1tQxNSUsrVsD" }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Consumer Department",
      icon: "users",
      color: "green",
      sections: [
        {
          id: "user_installation",
          name: "User Installation Section",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://user-installation.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/app/apps/drive/1NkxBNATXUDVkqTqufc3Dc4Om3gRfKtQQ?showAssistant=true&resourceKey=&showPreview=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/user-installation" }
          ]
        },
        {
          id: "user_maintenance",
          name: "User Maintenance Section",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://user-maintincae-ftth-ywk7.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/19kwWS4tPRR2MlVrcO9qBJgC90kLmbL6d?showAssistant=true&showPreview=true&resourceKey=" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/user-maintincae-ftth-ywk7/9ZRcN1ZA1W1ZUtDu2ULrsFvm6yFH" }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Fiber Deployment Department",
      icon: "project-diagram",
      color: "orange",
      description: "Drilling/Civil Work, QC, Fiber Deployment, OSP",
      sections: [
        {
          id: "fiber_deployment_main",
          name: "Fiber Deployment",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://fiber-dployment-s4h8.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/1uavPmYOpYLGZ9FjuDW_0Ydw2X7sK4w8b?showPreview=true&showAssistant=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/fiber-dployment-s4h8/GdrZNzZg31zZjmpx2M3DewQJjNjg" }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "FTTH Maintenance Department",
      icon: "tools",
      color: "red",
      sections: [
        {
          id: "ftth_maintenance",
          name: "FTTH Maintenance",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://bakerwaleed.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/19O9cobIUpEhkYNaHdQpRQq5cSNj8pYgG?showAssistant=true&resourceKey=&showPreview=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/bakerwaleed/DgyjDwyqVF8gGhNpN479o81qw2yy" }
          ]
        }
      ]
    },
    {
      id: 5,
      name: "Power Management",
      icon: "bolt",
      color: "yellow",
      sections: [
        {
          id: "power_management_main",
          name: "Power Management",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: true, url: "https://power-management-beta.vercel.app/" },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: true, url: "https://aistudio.google.com/apps/drive/1E5zggTXUHbENjbqjwL2OBczsRco7ydir?showAssistant=true&resourceKey=&showPreview=true" },
            { name: "Vercel Database", hyperlinked: true, url: "https://vercel.com/bakers-projects-2b4704d9/power-management/JEGMRDBAnDSZiAQCGGPgpUAZQuRb" }
          ]
        }
      ]
    },
    {
      id: 6,
      name: "GSM Section",
      icon: "broadcast-tower",
      color: "purple",
      sections: [
        {
          id: "gsm_main",
          name: "GSM Operations",
          labels: [
            { name: "Database", hyperlinked: false, url: null },
            { name: "Active Dashboard", hyperlinked: false, url: null },
            { name: "Bulk Data", hyperlinked: false, url: null },
            { name: "Micro Database", hyperlinked: false, url: null },
            { name: "Vercel Database", hyperlinked: false, url: null }
          ]
        }
      ]
    }
  ]
};

export const COLOR_CONFIG = {
  blue: { 
    bg: 'bg-blue-500', 
    light: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-500', 
    hover: 'hover:bg-blue-600',
    icon: 'text-blue-400',
    hoverBorder: 'hover:border-blue-200',
    shadow: 'shadow-blue-500/30'
  },
  green: { 
    bg: 'bg-green-500', 
    light: 'bg-green-50', 
    text: 'text-green-600', 
    border: 'border-green-500', 
    hover: 'hover:bg-green-600',
    icon: 'text-green-400',
    hoverBorder: 'hover:border-green-200',
    shadow: 'shadow-green-500/30'
  },
  orange: { 
    bg: 'bg-orange-500', 
    light: 'bg-orange-50', 
    text: 'text-orange-600', 
    border: 'border-orange-500', 
    hover: 'hover:bg-orange-600',
    icon: 'text-orange-400',
    hoverBorder: 'hover:border-orange-200',
    shadow: 'shadow-orange-500/30'
  },
  purple: { 
    bg: 'bg-purple-500', 
    light: 'bg-purple-50', 
    text: 'text-purple-600', 
    border: 'border-purple-500', 
    hover: 'hover:bg-purple-600',
    icon: 'text-purple-400',
    hoverBorder: 'hover:border-purple-200',
    shadow: 'shadow-purple-500/30'
  },
  red: { 
    bg: 'bg-red-500', 
    light: 'bg-red-50', 
    text: 'text-red-600', 
    border: 'border-red-500', 
    hover: 'hover:bg-red-600',
    icon: 'text-red-400',
    hoverBorder: 'hover:border-red-200',
    shadow: 'shadow-red-500/30'
  },
  yellow: { 
    bg: 'bg-yellow-500', 
    light: 'bg-yellow-50', 
    text: 'text-yellow-600', 
    border: 'border-yellow-500', 
    hover: 'hover:bg-yellow-600',
    icon: 'text-yellow-400',
    hoverBorder: 'hover:border-yellow-200',
    shadow: 'shadow-yellow-500/30'
  }
};

export const LABEL_ICONS: Record<string, string> = {
  'Database': 'fa-database',
  'Active Dashboard': 'fa-chart-line',
  'Bulk Data': 'fa-layer-group',
  'Micro Database': 'fa-cube',
  'Micro Database (Temp)': 'fa-cube',
  'Vercel Database': 'fa-cloud'
};
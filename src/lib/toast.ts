import { sileo, type SileoOptions, type SileoPosition } from 'sileo';
import 'sileo/styles.css';

const DEFAULT_FILL = '#00342f';
const DEFAULT_ROUNDNESS = 16;
const DEFAULT_POSITION: SileoPosition = 'top-center';

export interface ToastActionOptions {
  title: string;
  onClick: () => void;
}

export const toast = {
  success: (title: string, description?: string, options?: Partial<SileoOptions>) => {
    return sileo.success({
      title,
      description,
      fill: DEFAULT_FILL,
      roundness: DEFAULT_ROUNDNESS,
      position: DEFAULT_POSITION,
      duration: 4500,
      autopilot: true,
      ...options,
    });
  },

  error: (title: string, description?: string, options?: Partial<SileoOptions>) => {
    return sileo.error({
      title,
      description,
      fill: DEFAULT_FILL,
      roundness: DEFAULT_ROUNDNESS,
      position: DEFAULT_POSITION,
      duration: 5500,
      autopilot: true,
      ...options,
    });
  },

  warning: (title: string, description?: string, options?: Partial<SileoOptions>) => {
    return sileo.warning({
      title,
      description,
      fill: DEFAULT_FILL,
      roundness: DEFAULT_ROUNDNESS,
      position: DEFAULT_POSITION,
      duration: 5000,
      autopilot: true,
      ...options,
    });
  },

  info: (title: string, description?: string, options?: Partial<SileoOptions>) => {
    return sileo.info({
      title,
      description,
      fill: DEFAULT_FILL,
      roundness: DEFAULT_ROUNDNESS,
      position: DEFAULT_POSITION,
      duration: 4000,
      autopilot: true,
      ...options,
    });
  },

  action: (
    title: string,
    description: string,
    button: ToastActionOptions,
    options?: Partial<SileoOptions>
  ) => {
    return sileo.action({
      title,
      description,
      button,
      fill: DEFAULT_FILL,
      roundness: DEFAULT_ROUNDNESS,
      position: DEFAULT_POSITION,
      duration: 7000,
      autopilot: true,
      ...options,
    });
  },

  dismiss: (id: string) => {
    sileo.dismiss(id);
  },

  clear: (position?: SileoPosition) => {
    sileo.clear(position);
  },
};

export default toast;


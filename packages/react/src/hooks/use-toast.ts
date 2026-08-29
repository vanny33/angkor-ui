import * as React from "react";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info" | "loading";

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number; // ms
  open?: boolean;
}

type ToastActionType =
  | { type: "ADD_TOAST"; toast: ToastItem }
  | { type: "UPDATE_TOAST"; id: string; toast: Partial<ToastItem> }
  | { type: "DISMISS_TOAST"; id: string }
  | { type: "REMOVE_TOAST"; id: string };

const TOAST_LIMIT = 5;
let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

interface ToastState {
  toasts: ToastItem[];
}

const listeners: Array<(state: ToastState) => void> = [];
let memoryState: ToastState = { toasts: [] };

function reducer(state: ToastState, action: ToastActionType): ToastState {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, open: false } : t
        ),
      };

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };
  }
}

function dispatch(action: ToastActionType) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Imperative Toast API
export function toast({ ...props }: Omit<ToastItem, "id">) {
  const id = generateId();

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", id });
  const update = (toastProps: Partial<ToastItem>) =>
    dispatch({ type: "UPDATE_TOAST", id, toast: toastProps });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      duration: props.duration ?? 5000,
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

// Helper trigger methods
toast.success = (title: string, description?: string, duration?: number) => {
  return toast({ variant: "success", title, description, duration });
};

toast.error = (title: string, description?: string, duration?: number) => {
  return toast({ variant: "error", title, description, duration });
};

toast.warning = (title: string, description?: string, duration?: number) => {
  return toast({ variant: "warning", title, description, duration });
};

toast.info = (title: string, description?: string, duration?: number) => {
  return toast({ variant: "info", title, description, duration });
};

toast.loading = (title: string, description?: string, duration?: number) => {
  return toast({ variant: "loading", title, description, duration });
};

// Promise Toast API
toast.promise = <T>(
  promise: Promise<T> | (() => Promise<T>),
  config: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((err: any) => string);
    duration?: number;
  }
) => {
  const activePromise = typeof promise === "function" ? promise() : promise;
  const { id, dismiss, update } = toast({
    variant: "loading",
    title: config.loading,
    duration: 100000, // Long duration for loading state
  });

  activePromise
    .then((data) => {
      const successTitle =
        typeof config.success === "function"
          ? config.success(data)
          : config.success;
      update({
        variant: "success",
        title: successTitle,
        duration: config.duration ?? 5000,
      });
    })
    .catch((err) => {
      const errorTitle =
        typeof config.error === "function" ? config.error(err) : config.error;
      update({
        variant: "error",
        title: errorTitle,
        duration: config.duration ?? 5000,
      });
    });

  return activePromise;
};

// React hook to subscribe to state
export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id?: string) => {
      if (id) {
        dispatch({ type: "DISMISS_TOAST", id });
      } else {
        memoryState.toasts.forEach((t) => {
          dispatch({ type: "DISMISS_TOAST", id: t.id });
        });
      }
    },
    remove: (id: string) => dispatch({ type: "REMOVE_TOAST", id }),
  };
}

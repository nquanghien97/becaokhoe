import {
  Dispatch, MouseEventHandler, PropsWithChildren, SetStateAction, useRef,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppSidebarProps extends PropsWithChildren {
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  start?: string;
  end?: string;
  exit?: string;
}

export default function AppSidebar(props: AppSidebarProps) {
  const {
    children, open, setOpen, start = '-24rem', end = 0, exit = '-24rem',
  } = props;
  const backdropClass = 'h-screen w-full fixed top-0 left-0 z-[100] lg:hidden';
  const menuClass = 'w-full max-sm:w-2/3 max-lg:w-1/3 h-full flex flex-col border-r-2 border-[#0000001a] opacity-100 bg-[#ffffff]';
  const backdropRef = useRef<HTMLDivElement>(null);
  const clickHandler: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === backdropRef.current) {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="opacity-60 bg-[#0b0b0b] fixed inset-0 z-[11] lg:hidden" />
          <motion.div className={backdropClass} ref={backdropRef} onClick={clickHandler}>
            <motion.div
              className={menuClass}
              initial={{ x: start }}
              animate={{ x: end }}
              exit={{ x: exit }}
              transition={{
                ease: 'linear',
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
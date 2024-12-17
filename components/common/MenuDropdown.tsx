import {
  ReactNode,
  isValidElement,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

interface MenuDropdownProps {
  title: string;
  children: ReactNode;
  path: string;
}

function MenuDropdown(props: MenuDropdownProps) {
  const { children, title, path } = props;
  const [isHover, setIsHover] = useState(false);
  const onHover = () => {
    if (window.innerWidth > 1024) {
      setIsHover(true);
    }
  };
  const offHover = () => {
    if (window.innerWidth > 1024) {
      setIsHover(false);
    }
  };
  const toggleClick = () => {
    if (window.innerWidth <= 1024) {
      setIsHover(!isHover);
    }
  };
  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      display: 'none',
    },
  };

  const dropdownRef = useOutsideClick(() => {
    setIsHover(false);
  });
  const pathname = usePathname();
  // const key = children?.props.children.map(item => item.key)
  const getKeys = (children: React.ReactNode) => {
    if (isValidElement(children)) {
      const childrenArray = React.Children.toArray(children.props.children);
      return childrenArray.flatMap((child) => {
        if (isValidElement(child)) {
          return child.key;
        }
        return [];
      });
    }
    return [];
  };

  const key = getKeys(children)
  return (
    <div ref={dropdownRef} className="relative">
      <motion.div
        className="flex items-center"
        onHoverStart={onHover}
        onHoverEnd={offHover}
        onClick={toggleClick}
      >
        <Link href={path} className={`cursor-pointer after:content-['\\25be'] flex items-center ${key.includes(`.$${pathname}`) ? 'text-[#ff9900]' : ''}`}>
          {title}
        </Link>
        <motion.div
          className="absolute top-14 z-[100] w-full"
          initial="exit"
          animate={isHover ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default MenuDropdown;
import classNames from "classnames";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";

type TProps = {
  title: string;
  isActive: boolean;
  disabled?: boolean;
  onClick: VoidFunction;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>
  >;
};

export const NavigationMenuButton = observer<TProps>((props) => {
  const { title, isActive, disabled, onClick } = props;

  return (
    <motion.div
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={!disabled ? onClick : undefined}
      whileTap={!disabled && !isActive ? { scale: 0.95 } : undefined}
      className={classNames(
        "px-2 py-1 cursor-pointer w-fit select-none flex flex-col items-center",
        {
          "text-primary": isActive,
        }
      )}
    >
      <props.icon className="size-6" />
      <motion.span className="text-sm">{title}</motion.span>
    </motion.div>
  );
});

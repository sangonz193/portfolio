import React from "react";

export const withWrappers = <TProps extends object>(
  wrappers: React.FC<object>[],
  Component: React.ComponentType<TProps>
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<TProps> &
    React.RefAttributes<React.ComponentType<TProps>>
> =>
  React.forwardRef<React.ComponentType<TProps>, TProps>((props, ref) =>
    wrappers.reduceRight(
      (previousValue, CurrentValue) => (
        <CurrentValue>{previousValue}</CurrentValue>
      ),
      <Component ref={ref} {...props} />
    )
  );

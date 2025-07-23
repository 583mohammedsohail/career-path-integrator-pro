import { useReward } from 'react-rewards';
import { Button, ButtonProps } from '@/components/ui/button';
import { useId } from 'react';

export type RewardType = 'confetti' | 'emoji' | 'stars' | 'balloons' | 'hearts';
export type EffectPreset = 'subtle' | 'normal' | 'intense' | 'celebratory';

export interface RewardOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  lifetime?: number;
  elementCount?: number;
  elementSize?: number;
  colors?: string[];
  position?: 'top' | 'center' | 'bottom';
}

export type RewardButtonProps = ButtonProps & {
  rewardType?: RewardType;
  effectPreset?: EffectPreset;
  rewardOptions?: Partial<RewardOptions>;
  enableReward?: boolean;
};

const effectPresets: Record<EffectPreset, RewardOptions> = {
  subtle: {
    particleCount: 20,
    spread: 60,
    startVelocity: 15,
    lifetime: 150,
    elementSize: 8
  },
  normal: {
    particleCount: 35,
    spread: 120,
    startVelocity: 20,
    lifetime: 200,
    elementSize: 10
  },
  intense: {
    particleCount: 70,
    spread: 180,
    startVelocity: 30,
    lifetime: 300,
    elementSize: 12
  },
  celebratory: {
    particleCount: 150,
    spread: 360,
    startVelocity: 45,
    lifetime: 500,
    elementSize: 15
  }
};

export const RewardButton = ({
  rewardType = 'stars',
  effectPreset = 'normal',
  rewardOptions = {},
  enableReward = true,
  children,
  onClick,
  ...props
}: RewardButtonProps) => {
  const id = useId();
  const preset = effectPresets[effectPreset];
  const options = {
    ...preset,
    ...rewardOptions,
    colors: rewardOptions.colors || ['#3b82f6', '#ec4899', '#f59e0b'],
  };

  const { reward } = useReward(id, rewardType as any, options);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (enableReward) reward();
    onClick?.(e);
  };

  return (
    <div className="relative inline-block">
      <Button {...props} onClick={handleClick}>
        {children}
      </Button>
      {enableReward && (
        <span 
          id={id} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
        />
      )}
    </div>
  );
};

// Props type for the withReward HOC
type WithRewardProps = {
  onClick?: (e: any) => void;
  children?: React.ReactNode;
  [key: string]: any;
};

/**
 * HOC to wrap any component with reward effects
 */
export function withReward<T extends React.ComponentType<WithRewardProps>>(
  Component: T,
  options?: {
    rewardType?: RewardType;
    effectPreset?: EffectPreset;
    rewardOptions?: Partial<RewardOptions>;
  }
) {
  const WrappedComponent = (props: React.ComponentProps<T>) => {
    const id = useId();
    const preset = effectPresets[options?.effectPreset || 'normal'];
    const rewardOptions = {
      ...preset,
      ...options?.rewardOptions,
      colors: options?.rewardOptions?.colors || ['#3b82f6', '#ec4899', '#f59e0b'],
    };

    const { reward } = useReward(id, options?.rewardType || 'stars' as any, rewardOptions);

    const handleClick = (e: any) => {
      reward();
      props.onClick?.(e);
    };

    return (
      <div className="relative inline-block">
        <Component {...(props as any)} onClick={handleClick} />
        <span 
          id={id} 
          className="absolute inset-0 w-full h-full pointer-events-none" 
        />
      </div>
    );
  };

  return WrappedComponent;
};

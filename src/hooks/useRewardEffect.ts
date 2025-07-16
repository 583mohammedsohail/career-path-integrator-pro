import { useReward } from 'react-rewards';
import { useCallback } from 'react';
import type { RewardType, EffectPreset, RewardOptions } from '@/components/ui/RewardButton';

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

export const useRewardEffect = (
  id: string, 
  type: RewardType = 'stars',
  options?: {
    effectPreset?: EffectPreset;
    rewardOptions?: Partial<RewardOptions>;
  }
) => {
  const preset = effectPresets[options?.effectPreset || 'normal'];
  const rewardOptions = {
    ...preset,
    ...options?.rewardOptions,
    colors: options?.rewardOptions?.colors || ['#3b82f6', '#ec4899', '#f59e0b'],
  };

  const { reward } = useReward(id, type as any, rewardOptions);

  const withReward = useCallback(
    (callback?: () => void) => {
      return () => {
        reward();
        callback?.();
      };
    },
    [reward]
  );

  return { withReward };
};

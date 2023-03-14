import { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

type FontRuleSet = ({ fontWeight }: { fontWeight: 400 | 500 | 600 | 700 }) => RuleSet<object>;

export const displayFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 36px;
  line-height: 48px;
`;

export const headlineFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 24px;
  line-height: 32px;
`;

export const titleLargeFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 22px;
  line-height: 28px;
`;

export const titleMediumFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 20px;
  line-height: 24px;
`;

export const titleSmallFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 18px;
  line-height: 24px;
`;

export const bodyLargeFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 16px;
  line-height: 20px;
`;

export const bodyMediumFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 14px;
  line-height: 20px;
`;

export const bodySmallFont: FontRuleSet = ({ fontWeight }) => css`
  font-weight: ${fontWeight};
  font-size: 13px;
  line-height: 20px;
`;

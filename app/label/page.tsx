'use client';

import Label from 'components/common/Label';

import MediumChevronDownIcon from 'lib/assets/icons/chevron-down-medium.svg';
import SmallChevronDownIcon from 'lib/assets/icons/chevron-down-small.svg';
import MediumChevronUpIcon from 'lib/assets/icons/chevron-up-medium.svg';
import SmallChevronUpIcon from 'lib/assets/icons/chevron-up-small.svg';

import styles from './index.module.scss';

export default function Page() {
  const handleClick = () => {
    console.log('test');
  };

  return (
    <div style={{
      gap: '10px', display: 'flex', flexDirection: 'column', marginLeft: '10px',
    }}
    >
      <Label
        type="default"
        color="done"
        size="medium"
        onClick={handleClick}
        prefixIcon={<MediumChevronDownIcon />}
        suffixIcon={<MediumChevronUpIcon />}
      >
        label
      </Label>

      <Label
        type="default"
        color="done"
        size="medium"
        onClick={handleClick}
        prefixIcon={<MediumChevronDownIcon />}
      >
        label
      </Label>

      <Label
        type="default"
        color="done"
        size="medium"
        onClick={handleClick}
        suffixIcon={<MediumChevronUpIcon />}
      >
        label
      </Label>

      <Label type="default" color="positive" size="medium">
        label
      </Label>

      <Label type="default" color="danger" size="medium">
        label
      </Label>

      <Label type="default" color="attention" size="medium">
        label
      </Label>

      <Label type="default" color="active" size="medium">
        label
      </Label>

      <Label type="default" color="relate" size="medium">
        label
      </Label>

      <Label
        type="default"
        color="highlight"
        size="small"
        prefixIcon={<SmallChevronDownIcon />}
        suffixIcon={<SmallChevronUpIcon />}
      >
        label
      </Label>

      <Label
        type="reverse"
        color="done"
        size="small"
        onClick={handleClick}
        prefixIcon={<SmallChevronDownIcon className={styles.doneIcon} />}
        suffixIcon={<SmallChevronUpIcon className={styles.doneIcon} />}
      >
        label
      </Label>

      <Label type="reverse" color="positive" size="small">
        label
      </Label>

      <Label type="reverse" color="danger" size="small">
        label
      </Label>

      <Label type="reverse" color="attention" size="small">
        label
      </Label>

      <Label type="reverse" color="active" size="small">
        label
      </Label>

      <Label type="reverse" color="relate" size="small">
        label
      </Label>

      <Label
        type="reverse"
        color="highlight"
        size="medium"
        prefixIcon={<MediumChevronDownIcon className={styles.highlightIcon} />}
        suffixIcon={<MediumChevronUpIcon className={styles.highlightIcon} />}
      >
        label
      </Label>
    </div>
  );
}

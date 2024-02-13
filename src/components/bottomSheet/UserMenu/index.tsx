import { BottomSheet } from 'react-spring-bottom-sheet';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import ExternalLink from '@/components/common/ExternalLink';
import { ChevronRightIcon } from '@/lib/assets/icons';

import styles from './index.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function UserMenuBottomSheet({ isOpen, onClose }: Props) {
  const router = useRouter();

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={onClose}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 8,
        maxHeight / 2,
      ]}
      blocking={false}
    >
      <div className={styles.menuWrapper} role="menu">
        <button type="button" role="menuitem" className={styles.loginMenu} onClick={() => router.push('/login')}>
          <div className={styles.profile}>
            <Image src="/assets/images/img_avatar_default.png" alt="profile" width={48} height={48} />
            <div className={styles.name}>로그인</div>
          </div>
          <ChevronRightIcon />
        </button>
        <div className={styles.contents}>
          some contents..
        </div>
        <div className={styles.footer}>
          <ExternalLink href="#">이용약관</ExternalLink>
          •
          <ExternalLink href="#">개인정보 처리방침</ExternalLink>
        </div>
      </div>
    </BottomSheet>
  );
}

export default UserMenuBottomSheet;

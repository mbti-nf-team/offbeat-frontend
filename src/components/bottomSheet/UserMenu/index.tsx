import { BottomSheet } from 'react-spring-bottom-sheet';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import QueryString from 'qs';

import logoutAction from '@/actions/logout';
import ExternalLink from '@/components/common/ExternalLink';
import { paramsSerializer } from '@/lib/apis';
import { ChevronRightIcon } from '@/lib/assets/icons';
import { User } from '@/lib/types/auth';
import useToastStore from '@/stores/toast';

import styles from './index.module.scss';

type Props = {
  onToggleMenu: () => void;
  user: User | null;
};

function UserMenuBottomSheet({ onToggleMenu, user }: Props) {
  const router = useRouter();
  const { renderToast } = useToastStore(['renderToast']);
  const searchParams = useSearchParams();
  const isOpenMenu = searchParams.get('menu');

  const openLogin = () => {
    onToggleMenu();
    const params = QueryString.parse(searchParams.toString());

    const { menu, ...rest } = params;

    router.push(`/login?${paramsSerializer(rest)}`);
  };

  const onClose = () => onToggleMenu();

  const onLogout = async () => {
    try {
      await logoutAction();

      renderToast('로그아웃 되었어요.', {
        type: 'success',
      });
    } catch (error) {
      renderToast('로그아웃에 실패하였어요.', {
        type: 'error',
      });
    }
  };

  return (
    <BottomSheet
      open={!!isOpenMenu}
      onDismiss={onClose}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 8,
        maxHeight / 2,
      ]}
      blocking={false}
    >
      <div className={styles.menuWrapper} role="menu">
        {user ? (
          <div className={styles.loginMenu}>
            <div className={styles.profile}>
              {user?.profile_image_url ? (
                <Image
                  src={user.profile_image_url}
                  alt={user.email}
                  width={48}
                  height={48}
                  className={styles.image}
                />
              ) : (
                <Image src="/assets/images/img_avatar_default.png" alt="profile" width={48} height={48} />
              )}
              <div className={styles.name}>{user.nickname}</div>
            </div>
            <button type="button" onClick={onLogout} className={styles.logoutButton}>
              <div>로그아웃</div>
              <ChevronRightIcon className={styles.logoutIcon} />
            </button>
          </div>
        ) : (
          <button type="button" role="menuitem" className={styles.loginMenu} onClick={openLogin}>
            <div className={styles.profile}>
              <Image src="/assets/images/img_avatar_default.png" alt="profile" width={48} height={48} />
              <div className={styles.name}>로그인</div>
            </div>
            <ChevronRightIcon className={styles.icon} />
          </button>
        )}
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

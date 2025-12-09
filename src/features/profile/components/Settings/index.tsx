import { Modal, toast } from '@shared/components';
import { ROUTES } from '@shared/config/routes';

import { SettingList } from '../SettingList';

import styles from './style.module.scss';

export function Settings() {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      toast.success('로그아웃 되었습니다.');
    } catch (error) {
      toast.error('로그아웃을 실패하였습니다.');
    }
  };
  return (
    <div>
      <div className={styles.Settings__Section}>
        <SettingList title="개인정보" path={ROUTES.SETTING_USER} />
        <SettingList title="자주 묻는 질문" />
        <SettingList title="1:1 문의" />
      </div>
      <div className={styles.Settings__Gap}></div>
      <div className={styles.Settings__Section}>
        <SettingList title="서비스 이용약관" />
        <SettingList title="개인정보 처리방침" />
      </div>
      <div className={styles.Settings__Gap}></div>
      <div className={styles.Settings__Section}>
        <SettingList title="로그아웃" isIcon={false} onClick={handleLogout} path={ROUTES.LOGIN} />
        <Modal
          variant="warning"
          trigger={
            <SettingList
              title="탈퇴하기"
              isIcon={false}
              titleColor="var(--error-500)"
              onClick={handleLogout}
            />
          }
          onConfirm={() => {
            // TODO: 탈퇴 처리 로직
            console.log('탈퇴 처리 실행');
          }}
        />
      </div>
    </div>
  );
}

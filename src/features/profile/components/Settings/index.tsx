import { SettingList } from '../SettingList';

import styles from './style.module.scss';

export function Settings() {
  return (
    <div>
      <div className={styles.Settings__Section}>
        <SettingList title="개인정보" />
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
        <SettingList title="로그아웃" isIcon={false} />
        <SettingList title="탈퇴하기" isIcon={false} titleColor="var(--error-500)" />
      </div>
    </div>
  );
}

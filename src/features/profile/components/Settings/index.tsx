import { SettingList } from '../SettingList';

import styles from './style.module.scss';
import { Modal } from '@shared/components';

export function Settings() {
  return (
    <div>
      <div className={styles.Settings__Section}>
        <SettingList title="개인정보" path="settings/user" />
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
        <Modal
          variant="warning"
          texts={{
            title: '정말 탈퇴하시겠어요?',
            content: '탈퇴 시 체험단 신청 내역과 후기 기록이 모두 삭제되며 복구할 수 없습니다.',
          }}
          trigger={
            <SettingList
              title="탈퇴하기"
              isIcon={false}
              titleColor="var(--error-500)"
              onClick={() => {}}
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

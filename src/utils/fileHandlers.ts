import { Toast } from '../styles/toast-style';
import { Widget } from '../types/base';

const DBVersion = 3;

// IndexedDB에 data 저장
export const saveJSONFile = (widgets: Widget[]) => {
    const request = window.indexedDB.open('widgetDB', DBVersion);

    // DB에 데이터 저장
    const saveToDB = (db: IDBDatabase) => {
        const transaction = db.transaction(['widgets'], 'readwrite');
        const store = transaction.objectStore('widgets');
        store.clear();
        store.put({ id: 'widgets', data: widgets });

        transaction.oncomplete = () => {
            Toast.success('위젯이 저장되었습니다.');
            console.log('위젯 저장 완료', widgets);
        };

        transaction.onerror = (event) => {
            console.error('위젯 저장 실패', event);
            Toast.error('저장 실패');
        };
    };

    // DB 초기 생성 및 트랜잭션 연결
    request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('widgets')) {
            db.createObjectStore('widgets', { keyPath: 'id' });
        }
    };

    request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('widgets')) {
            db.close(); // 기존 연결 종료
            const newVersion = db.version + 1;

            const upgradeRequest = indexedDB.open('widgetDB', newVersion);

            upgradeRequest.onupgradeneeded = (event) => {
                const upgradeDb = (event.target as IDBOpenDBRequest).result;
                upgradeDb.createObjectStore('widgets', { keyPath: 'id' });
            };

            upgradeRequest.onsuccess = (event) => {
                const upgradeDb = (event.target as IDBOpenDBRequest).result;
                saveToDB(upgradeDb);
            };

            upgradeRequest.onerror = (event) => {
                console.error('DB 버전 업그레이드 중 오류 발생', event);
                Toast.error('저장 실패: DB 버전 업그레이드 오류');
            };
        } else {
            saveToDB(db); // DB 재연결
        }
    };
    request.onerror = (event) => {
        console.error('위젯 불러오는 과정에 오류 발생', event);
    };
};

// IndexedDB에 저장된 data 불러오기
export const loadJSONFile = (setWidget: (widgets: Widget[]) => void) => {
    const request = window.indexedDB.open('widgetDB', DBVersion);
    request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('widgets')) {
            Toast.error('저장된 위젯이 없습니다.');
            return;
        }

        const transection = db.transaction(['widgets'], 'readonly');
        const store = transection.objectStore('widgets');
        const getRequest = store.getAll();

        getRequest.onsuccess = (event) => {
            const data = (event.target as IDBRequest).result;
            setWidget(data[0].data); // 배열 불러오기
            console.log('위젯 불러오기 완료', data[0].data);
            Toast.success('저장한 위젯을 불러왔습니다.');
        };
        getRequest.onerror = (event) => {
            console.error('위젯 불러오는 과정에 오류 발생', event);
        };
    };
};

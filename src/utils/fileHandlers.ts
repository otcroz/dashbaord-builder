import { useWidgetStore } from '../state/store';
import { Widget } from '../types/base';

// IndexedDB에 data 저장
export const saveJSONFile = () => {
    const { widgets } = useWidgetStore.getState();
    const request = window.indexedDB.open('widgetDB', 2);

    // DB 초기 생성
    request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('widgets')) {
            db.createObjectStore('widgets', { keyPath: 'id' });
        }
    };

    request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transection = db.transaction(['widgets'], 'readwrite');
        const store = transection.objectStore('widgets');
        store.clear();
        store.put({ id: 'widgets', data: widgets }); // 배열 저장

        transection.oncomplete = () => {
            console.log('위젯 저장 완료', widgets);
        };
        transection.onerror = (event) => {
            console.error('위젯 저장 과정에 오류 발생', event);
        };
    };
};

// IndexedDB에 저장된 data 불러오기
export const loadJSONFile = () => {
    const { setWidget } = useWidgetStore.getState();
    const request = window.indexedDB.open('widgetDB', 2);
    request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transection = db.transaction(['widgets'], 'readonly');
        const store = transection.objectStore('widgets');
        const getRequest = store.getAll();

        getRequest.onsuccess = (event) => {
            const data = (event.target as IDBRequest).result;
            setWidget(data[0].data); // 배열 불러오기
            console.log('위젯 불러오기 완료', data[0].data);
        };
        getRequest.onerror = (event) => {
            console.error('위젯 불러오는 과정에 오류 발생', event);
        };
    };
};

import { useState } from 'react';

export interface NoteEntry {
    id: string;
    year: number;
    content: string;
    timestamp: number;
}

export interface NotesStore {
    [mmdd: string]: NoteEntry[];
}

const STORAGE_KEY = 'ancient_calendar_notes';

export const usePersonalNotes = () => {
    const [notes, setNotes] = useState<NotesStore>(() => {
        if (typeof localStorage === 'undefined') return {};

        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return {};

        try {
            return JSON.parse(stored);
        } catch {
            console.error('Failed to parse notes from local storage');
            return {};
        }
    });

    // 保存笔记
    const addNote = (dateStr: string, content: string) => {
        if (!content.trim()) return;

        const dateObj = new Date(dateStr);
        const mmdd = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const year = dateObj.getFullYear();

        const newEntry: NoteEntry = {
            id: crypto.randomUUID(),
            year,
            content: content.trim(),
            timestamp: Date.now()
        };

        const currentNotes = { ...notes };
        if (!currentNotes[mmdd]) {
            currentNotes[mmdd] = [];
        }

        // 追加并按年份倒序排序 (最新的排前面)
        currentNotes[mmdd] = [...currentNotes[mmdd], newEntry].sort((a, b) => b.year - a.year);

        setNotes(currentNotes);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotes));
    };

    // 获取某一天(MM-DD)的所有笔记
    const getNotesForDate = (dateStr: string): NoteEntry[] => {
        const dateObj = new Date(dateStr);
        const mmdd = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        return notes[mmdd] || [];
    };

    // 获取当天的格式化键名用于查历史数据
    const getMMDD = (dateStr: string): string => {
        const dateObj = new Date(dateStr);
        return `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    }

    // 更新笔记
    const updateNote = (dateStr: string, id: string, newContent: string) => {
        if (!newContent.trim()) return;
        const mmdd = getMMDD(dateStr);
        const currentNotes = { ...notes };
        if (currentNotes[mmdd]) {
            currentNotes[mmdd] = currentNotes[mmdd].map(note =>
                note.id === id ? { ...note, content: newContent.trim() } : note
            );
            setNotes(currentNotes);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotes));
        }
    };

    // 删除笔记
    const deleteNote = (dateStr: string, id: string) => {
        const mmdd = getMMDD(dateStr);
        const currentNotes = { ...notes };
        if (currentNotes[mmdd]) {
            currentNotes[mmdd] = currentNotes[mmdd].filter(note => note.id !== id);
            // 如果删空了，可以考虑保留空数组或者直接删除这个 key
            if (currentNotes[mmdd].length === 0) {
                delete currentNotes[mmdd];
            }
            setNotes(currentNotes);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(currentNotes));
        }
    };


    // 获取特定日期（月-日）在所有年份中的记录
    const getNotesForDayAcrossYears = (mmdd: string): NoteEntry[] => {
        return notes[mmdd] || [];
    };

    // 获取所有笔记的拍平列表（用于管理界面）
    const getAllNotesList = (): (NoteEntry & { date: string })[] => {
        const allNotes: (NoteEntry & { date: string })[] = [];
        Object.keys(notes).forEach(dateStr => {
            notes[dateStr].forEach(note => {
                allNotes.push({ ...note, date: dateStr });
            });
        });
        // 默认按时间倒序
        return allNotes.sort((a, b) => b.timestamp - a.timestamp);
    };

    // 导出数据为 JSON 字符串
    const exportData = (): string => {
        if (Object.keys(notes).length === 0) {
            // 如果为空，提供一份用于外部编辑器参考和填写的示例模板
            const dateObj = new Date();
            const mmdd = `${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
            const template = {
                [mmdd]: [
                    {
                        "id": crypto.randomUUID(),
                        "year": dateObj.getFullYear(),
                        "content": "这是一条示例记录。您可以在电脑的记事本里仿照这个格式（年月、内容）接着往下写，填好保存后即可导入系统！",
                        "timestamp": Date.now()
                    }
                ],
                "01-01": [
                    {
                        "id": crypto.randomUUID(),
                        "year": 2024,
                        "content": "元旦快乐。只要保证格式不乱，导入后系统就能认出您的文字！",
                        "timestamp": Date.now() - 1000000
                    }
                ]
            };
            return JSON.stringify(template, null, 2);
        }
        return JSON.stringify(notes, null, 2);
    };

    // 导入 JSON 数据
    const importData = (jsonData: string): boolean => {
        try {
            const parsed = JSON.parse(jsonData);
            // 简单验证数据结构
            if (typeof parsed === 'object' && parsed !== null) {
                setNotes(parsed);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
                return true;
            }
            return false;
        } catch (e) {
            console.error("Import failed:", e);
            return false;
        }
    };

    return {
        notes,
        addNote,
        updateNote,
        deleteNote,
        getNotesForDate,
        getMMDD,
        getAllNotes: getAllNotesList,
        getNotesForDayAcrossYears,
        exportData,
        importData
    };
};

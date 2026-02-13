
import React, { useState } from 'react';
import { STRINGS, COLORS } from '../constants';

const ArchitectureViewer: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeFile, setActiveFile] = useState('User.java');

  const files: Record<string, string> = {
    'User.java': `
package com.susalon.models;

public class User {
    private String id;
    private String name;
    private int age;
    private String email;
    private String phone;
    private Gender gender;
    private UserType type;

    public enum Gender { MALE, FEMALE }
    public enum UserType { CLIENT, EXPERT }

    // Constructor, Getters & Setters
    public User(String id, String name, int age, Gender gender, UserType type) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.type = type;
    }
}
    `,
    'ExpertRepository.java': `
package com.susalon.repositories;

import com.susalon.models.User;
import com.susalon.models.Expert;
import java.util.List;
import java.util.stream.Collectors;

public class ExpertRepository {
    
    /**
     * Core Segregation Logic:
     * Filters experts to match the client's gender.
     */
    public List<Expert> getFilteredExperts(List<Expert> allExperts, User currentUser) {
        return allExperts.stream()
            .filter(expert -> expert.getGender() == currentUser.getGender())
            .collect(Collectors.toList());
    }
}
    `,
    'signup_layout.xml': `
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout 
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#FFFFFF"
    android:layoutDirection="rtl">

    <ImageView
        android:id="@+id/logo_su_salon"
        android:layout_width="120dp"
        android:layout_height="120dp"
        android:src="@drawable/logo_su_salon"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="40dp" />

    <com.google.android.material.textfield.TextInputLayout
        android:id="@+id/nameInput"
        style="@style/Widget.Material3.TextInputLayout.OutlinedBox"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:hint="@string/label_name"
        android:layout_marginHorizontal="24dp"
        app:layout_constraintTop_toBottomOf="@id/logo_su_salon">

        <com.google.android.material.textfield.TextInputEditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:inputType="textPersonName" />
    </com.google.android.material.textfield.TextInputLayout>

    <com.google.android.material.button.MaterialButton
        android:layout_width="match_parent"
        android:layout_height="60dp"
        android:text="@string/btn_signup"
        android:backgroundTint="#D4AF37"
        android:layout_margin="24dp"
        app:layout_constraintBottom_toBottomOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
    `,
    'strings.xml': `
<resources>
    <string name="app_name">SU Salon</string>
    <string name="label_name">الاسم الكامل</string>
    <string name="label_gender">الجنس</string>
    <string name="gender_male">ذكر</string>
    <string name="gender_female">أنثى</string>
    <string name="btn_signup">إنشاء حساب</string>
    <string name="msg_verification">سيتم إرسال رمز التحقق</string>
</resources>
    `
  };

  return (
    <div className="flex flex-col flex-1 bg-white overflow-hidden">
      <header className="p-4 border-b flex items-center justify-between">
         <h1 className="font-bold text-gray-800">هيكلية التطبيق (Android Code)</h1>
         <button onClick={onBack} className="text-sm text-gold font-bold" style={{ color: COLORS.PRIMARY_GOLD }}>إغلاق</button>
      </header>

      <div className="flex-1 flex flex-col">
        <div className="flex overflow-x-auto p-2 bg-gray-50 border-b space-x-2 space-x-reverse whitespace-nowrap scrollbar-hide">
          {Object.keys(files).map(name => (
            <button 
              key={name}
              onClick={() => setActiveFile(name)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${activeFile === name ? 'bg-white shadow-sm border border-gray-100 text-gold' : 'text-gray-400'}`}
              style={{ color: activeFile === name ? COLORS.PRIMARY_GOLD : undefined }}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex-1 p-4 bg-gray-900 overflow-auto font-mono text-[10px] leading-relaxed text-blue-300 dir-ltr text-left">
          <pre><code>{files[activeFile]}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureViewer;

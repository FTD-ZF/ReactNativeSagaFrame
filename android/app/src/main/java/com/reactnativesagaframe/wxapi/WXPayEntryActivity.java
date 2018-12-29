package com.reactnativesagaframe.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.theweflex.react.WeChatModule;

/**
 * Created by ftd_zf on 2018/12/28.
 */

public class WXPayEntryActivity extends Activity {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        WeChatModule.handleIntent(getIntent());
        finish();
    }
}

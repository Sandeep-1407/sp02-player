package com.sandeep.sp02;

import android.Manifest;
import android.content.ContentUris;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Size;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import java.io.ByteArrayOutputStream;

/** Lists every video on the phone through Android MediaStore (like MX Player). */
@CapacitorPlugin(
    name = "MediaScan",
    permissions = {
        @Permission(alias = "videos", strings = { Manifest.permission.READ_MEDIA_VIDEO }),
        @Permission(alias = "storage", strings = { Manifest.permission.READ_EXTERNAL_STORAGE })
    }
)
public class MediaScanPlugin extends Plugin {

    private String alias() {
        return Build.VERSION.SDK_INT >= 33 ? "videos" : "storage";
    }

    private boolean granted() {
        return getPermissionState(alias()) == PermissionState.GRANTED;
    }

    @PluginMethod
    public void checkAccess(PluginCall call) {
        JSObject r = new JSObject();
        r.put("granted", granted());
        call.resolve(r);
    }

    @PluginMethod
    public void requestAccess(PluginCall call) {
        if (granted()) { checkAccess(call); return; }
        requestPermissionForAlias(alias(), call, "accessCallback");
    }

    @PermissionCallback
    private void accessCallback(PluginCall call) {
        checkAccess(call);
    }

    @PluginMethod
    public void listVideos(PluginCall call) {
        if (!granted()) { call.reject("Video permission not granted"); return; }
        getBridge().execute(() -> {
            JSArray arr = new JSArray();
            Uri base = MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            String[] cols = {
                MediaStore.Video.Media._ID, MediaStore.Video.Media.DISPLAY_NAME, MediaStore.Video.Media.SIZE,
                MediaStore.Video.Media.DURATION, MediaStore.Video.Media.DATE_MODIFIED, MediaStore.Video.Media.BUCKET_DISPLAY_NAME,
                MediaStore.Video.Media.DATA, MediaStore.Video.Media.WIDTH, MediaStore.Video.Media.HEIGHT, MediaStore.Video.Media.MIME_TYPE
            };
            try (Cursor c = getContext().getContentResolver().query(base, cols, null, null, MediaStore.Video.Media.DATE_MODIFIED + " DESC")) {
                if (c != null) {
                    while (c.moveToNext()) {
                        long id = c.getLong(0);
                        JSObject v = new JSObject();
                        v.put("id", id);
                        v.put("name", c.getString(1));
                        v.put("size", c.getLong(2));
                        v.put("duration", c.getLong(3));
                        v.put("date", c.getLong(4));
                        v.put("folder", c.getString(5));
                        v.put("path", c.getString(6));
                        v.put("width", c.getInt(7));
                        v.put("height", c.getInt(8));
                        v.put("mime", c.getString(9));
                        v.put("uri", ContentUris.withAppendedId(base, id).toString());
                        arr.put(v);
                    }
                }
                JSObject r = new JSObject();
                r.put("videos", arr);
                call.resolve(r);
            } catch (Exception e) {
                call.reject("Scan failed: " + e.getMessage());
            }
        });
    }

    @PluginMethod
    public void thumbnail(PluginCall call) {
        String idStr = call.getString("id");
        if (idStr == null) { call.reject("id missing"); return; }
        getBridge().execute(() -> {
            try {
                long id = Long.parseLong(idStr);
                Bitmap bmp;
                if (Build.VERSION.SDK_INT >= 29) {
                    Uri u = ContentUris.withAppendedId(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, id);
                    bmp = getContext().getContentResolver().loadThumbnail(u, new Size(320, 180), null);
                } else {
                    bmp = MediaStore.Video.Thumbnails.getThumbnail(getContext().getContentResolver(), id, MediaStore.Video.Thumbnails.MINI_KIND, null);
                }
                if (bmp == null) { call.reject("no thumbnail"); return; }
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                bmp.compress(Bitmap.CompressFormat.JPEG, 70, out);
                JSObject r = new JSObject();
                r.put("data", "data:image/jpeg;base64," + Base64.encodeToString(out.toByteArray(), Base64.NO_WRAP));
                call.resolve(r);
            } catch (Exception e) {
                call.reject("thumbnail failed: " + e.getMessage());
            }
        });
    }
}

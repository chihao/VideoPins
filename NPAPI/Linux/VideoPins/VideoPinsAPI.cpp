/**********************************************************\

  Auto-generated VideoPinsAPI.cpp

\**********************************************************/

#include "JSObject.h"
#include "variant_list.h"
#include "DOM/Document.h"
#include "global/config.h"

#include "VideoPinsAPI.h"

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::echo(const FB::variant& msg)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
FB::variant VideoPinsAPI::echo(const FB::variant& msg)
{
    static int n(0);
    fire_echo("So far, you clicked this many times: ", n++);

    // return "foobar";
    return msg;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::HookWindow(const std::string classN, const std::string title, const int x, const int y, const int width, const int height)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
FB::variant VideoPinsAPI::HookWindow(const std::string classN, const std::string title, const int x, const int y, const int width, const int height)
{
    Window activate = EXIT_FAILURE;
    Display *disp = XOpenDisplay(NIL);

    std::vector<gchar> mTitle(title.c_str(),title.c_str()+title.length()+1);
    std::vector<gchar> mClass(classN.c_str(),classN.c_str()+classN.length()+1);
    while(activate==EXIT_FAILURE)
    {
        activate = action_window_str(disp, &mClass[0], &mTitle[0]);
    }

    char opt[] = "add,above";
    window_state(disp, activate, opt);

    XResizeWindow(disp, activate, width, height);
    XMoveWindow(disp, activate, x, y);

    XCloseDisplay(disp);

    return activate;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::ReHookWindow(const int windowId)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::ReHookWindow(const int windowId)
{
    Window activate = windowId;
    Display *disp = XOpenDisplay(NIL);
    char opt[] = "add,above";

    int ret = window_state(disp, activate, opt);
    XCloseDisplay(disp);

    return ret;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::UnHookWindow(const int windowId)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
int VideoPinsAPI::UnHookWindow(const int windowId)
{
    Window activate = windowId;
    Display *disp = XOpenDisplay(NIL);
    char opt[] = "remove,above";

    int ret = window_state(disp, activate, opt);
    XCloseDisplay(disp);

    return ret;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn FB::variant VideoPinsAPI::Xtest(const std::string classN, const std::string title)
///
/// @brief  Echos whatever is passed from Javascript.
///         Go ahead and change it. See what happens!
///////////////////////////////////////////////////////////////////////////////
FB::variant VideoPinsAPI::Xtest(const std::string classN, const std::string title)
{
    
    Window activate = EXIT_FAILURE;
    Display *disp = XOpenDisplay(NIL);

    std::vector<gchar> mTitle(title.c_str(),title.c_str()+title.length()+1);
    std::vector<gchar> mClass(classN.c_str(),classN.c_str()+classN.length()+1);
    while(activate==EXIT_FAILURE)
    {
        activate = action_window_str(disp, &mClass[0], &mTitle[0]);
    }
    
    XCloseDisplay(disp);
    /*
    assert(dpy);
    Window w = XCreateWindow(dpy, DefaultRootWindow(dpy), 0, 0, 
                 200, 100, 0, 
                 CopyFromParent, CopyFromParent, CopyFromParent,
                 NIL, 0);
    XMapWindow(dpy, w);
    XFlush(dpy);
    sleep(10);
    */

    return activate;
}

///////////////////////////////////////////////////////////////////////////////
/// @fn VideoPinsPtr VideoPinsAPI::getPlugin()
///
/// @brief  Gets a reference to the plugin that was passed in when the object
///         was created.  If the plugin has already been released then this
///         will throw a FB::script_error that will be translated into a
///         javascript exception in the page.
///////////////////////////////////////////////////////////////////////////////
VideoPinsPtr VideoPinsAPI::getPlugin()
{
    VideoPinsPtr plugin(m_plugin.lock());
    if (!plugin) {
        throw FB::script_error("The plugin is invalid");
    }
    return plugin;
}

// Read/Write property testString
std::string VideoPinsAPI::get_testString()
{
    return m_testString;
}

void VideoPinsAPI::set_testString(const std::string& val)
{
    m_testString = val;
}

// Read-only property version
std::string VideoPinsAPI::get_version()
{
    return FBSTRING_PLUGIN_VERSION;
}

void VideoPinsAPI::testEvent()
{
    fire_test();
}

// ----------------------------------------------------------------------------------
// Part of wmctrl source code.

static Window *get_client_list (Display *disp, unsigned long *size) {/*{{{*/
    Window *client_list;

    if ((client_list = (Window *)get_property(disp, DefaultRootWindow(disp), 
                    XA_WINDOW, "_NET_CLIENT_LIST", size)) == NULL) {
        if ((client_list = (Window *)get_property(disp, DefaultRootWindow(disp), 
                        XA_CARDINAL, "_WIN_CLIENT_LIST", size)) == NULL) {
            fputs("Cannot get client list properties. \n"
                  "(_NET_CLIENT_LIST or _WIN_CLIENT_LIST)"
                  "\n", stderr);
            return NULL;
        }
    }

    return client_list;
}/*}}}*/

static Window action_window_str (Display *disp, gchar *class_name, gchar *title_name) {/*{{{*/
    Window activate = 0;
    Window *client_list;
    unsigned long client_list_size;
    int i;
    
    if ((client_list = get_client_list(disp, &client_list_size)) == NULL) {
        return EXIT_FAILURE; 
    }
    
    for (i = 0; i < client_list_size / sizeof(Window); i++) {
            gchar *r_class_name = get_window_class(disp, client_list[i]);
            gchar *r_title_name = get_window_title(disp, client_list[i]);

            if(strcmp(r_class_name, class_name) == 0 &&
                strcmp(r_title_name, title_name) == 0)
            {
                activate = client_list[i];
                g_free(r_class_name);
                g_free(r_title_name);
                break;
            }
    }
    g_free(client_list);

    if (activate) {
        return activate;
        //action_window(disp, activate);
    }
    else {
        return EXIT_FAILURE;
    }
}/*}}}*/

static gchar *get_window_class (Display *disp, Window win) {/*{{{*/
    gchar *class_utf8;
    gchar *wm_class;
    unsigned long size;

    wm_class = get_property(disp, win, XA_STRING, "WM_CLASS", &size);
    if (wm_class) {
        gchar *p_0 = strchr(wm_class, '\0');
        if (wm_class + size - 1 > p_0) {
            *(p_0) = '.';
        }
        class_utf8 = g_locale_to_utf8(wm_class, -1, NULL, NULL, NULL);
    }
    else {
        class_utf8 = NULL;
    }

    g_free(wm_class);
    
    return class_utf8;
}/*}}}*/

static gchar *get_window_title (Display *disp, Window win) {/*{{{*/
    gchar *title_utf8;
    gchar *wm_name;
    gchar *net_wm_name;

    wm_name = get_property(disp, win, XA_STRING, "WM_NAME", NULL);
    net_wm_name = get_property(disp, win, 
            XInternAtom(disp, "UTF8_STRING", False), "_NET_WM_NAME", NULL);

    if (net_wm_name) {
        title_utf8 = g_strdup(net_wm_name);
    }
    else {
        if (wm_name) {
            title_utf8 = g_locale_to_utf8(wm_name, -1, NULL, NULL, NULL);
        }
        else {
            title_utf8 = NULL;
        }
    }

    g_free(wm_name);
    g_free(net_wm_name);
    
    return title_utf8;
}/*}}}*/

static gchar *get_property (Display *disp, Window win, /*{{{*/
        Atom xa_prop_type, gchar *prop_name, unsigned long *size) {
    Atom xa_prop_name;
    Atom xa_ret_type;
    int ret_format;
    unsigned long ret_nitems;
    unsigned long ret_bytes_after;
    unsigned long tmp_size;
    unsigned char *ret_prop;
    gchar *ret;
    
    xa_prop_name = XInternAtom(disp, prop_name, False);
    
    /* MAX_PROPERTY_VALUE_LEN / 4 explanation (XGetWindowProperty manpage):
     *
     * long_length = Specifies the length in 32-bit multiples of the
     *               data to be retrieved.
     */
    if (XGetWindowProperty(disp, win, xa_prop_name, 0, MAX_PROPERTY_VALUE_LEN / 4, False,
            xa_prop_type, &xa_ret_type, &ret_format,     
            &ret_nitems, &ret_bytes_after, &ret_prop) != Success) {
        p_verbose("Cannot get %s property.\n", prop_name);
        return NULL;
    }
  
    if (xa_ret_type != xa_prop_type) {
        p_verbose("Invalid type of %s property.\n", prop_name);
        XFree(ret_prop);
        return NULL;
    }

    /* null terminate the result to make string handling easier */
    tmp_size = (ret_format / 8) * ret_nitems;
    ret = (char*) g_malloc(tmp_size + 1);
    memcpy(ret, ret_prop, tmp_size);
    ret[tmp_size] = '\0';

    if (size) {
        *size = tmp_size;
    }
    
    XFree(ret_prop);
    return ret;
}/*}}}*/

static int window_state (Display *disp, Window win, char *arg) {/*{{{*/
    unsigned long action;
    Atom prop1 = 0;
    Atom prop2 = 0;
    char *p1, *p2;
    const char *argerr = "The -b option expects a list of comma separated parameters: \"(remove|add|toggle),<PROP1>[,<PROP2>]\"\n";

    if (!arg || strlen(arg) == 0) {
        fputs(argerr, stderr);
        return EXIT_FAILURE;
    }

    if ((p1 = strchr(arg, ','))) {
        gchar *tmp_prop1, *tmp1;
        
        *p1 = '\0';

        /* action */
        if (strcmp(arg, "remove") == 0) {
            action = _NET_WM_STATE_REMOVE;
        }
        else if (strcmp(arg, "add") == 0) {
            action = _NET_WM_STATE_ADD;
        }
        else if (strcmp(arg, "toggle") == 0) {
            action = _NET_WM_STATE_TOGGLE;
        }
        else {
            fputs("Invalid action. Use either remove, add or toggle.\n", stderr);
            return EXIT_FAILURE;
        }
        p1++;

        /* the second property */
        if ((p2 = strchr(p1, ','))) {
            gchar *tmp_prop2, *tmp2;
            *p2 = '\0';
            p2++;
            if (strlen(p2) == 0) {
                fputs("Invalid zero length property.\n", stderr);
                return EXIT_FAILURE;
            }
            tmp_prop2 = g_strdup_printf("_NET_WM_STATE_%s", tmp2 = g_ascii_strup(p2, -1));
            p_verbose("State 2: %s\n", tmp_prop2); 
            prop2 = XInternAtom(disp, tmp_prop2, False);
            g_free(tmp2);
            g_free(tmp_prop2);
        }

        /* the first property */
        if (strlen(p1) == 0) {
            fputs("Invalid zero length property.\n", stderr);
            return EXIT_FAILURE;
        }
        tmp_prop1 = g_strdup_printf("_NET_WM_STATE_%s", tmp1 = g_ascii_strup(p1, -1));
        p_verbose("State 1: %s\n", tmp_prop1); 
        prop1 = XInternAtom(disp, tmp_prop1, False);
        g_free(tmp1);
        g_free(tmp_prop1);

        
        return client_msg(disp, win, "_NET_WM_STATE", 
            action, (unsigned long)prop1, (unsigned long)prop2, 0, 0);
    }
    else {
        fputs(argerr, stderr);
        return EXIT_FAILURE;
    }
}/*}}}*/

static int client_msg(Display *disp, Window win, char *msg, /* {{{ */
        unsigned long data0, unsigned long data1, 
        unsigned long data2, unsigned long data3,
        unsigned long data4) {
    XEvent event;
    long mask = SubstructureRedirectMask | SubstructureNotifyMask;

    event.xclient.type = ClientMessage;
    event.xclient.serial = 0;
    event.xclient.send_event = True;
    event.xclient.message_type = XInternAtom(disp, msg, False);
    event.xclient.window = win;
    event.xclient.format = 32;
    event.xclient.data.l[0] = data0;
    event.xclient.data.l[1] = data1;
    event.xclient.data.l[2] = data2;
    event.xclient.data.l[3] = data3;
    event.xclient.data.l[4] = data4;
    
    if (XSendEvent(disp, DefaultRootWindow(disp), False, mask, &event)) {
        return EXIT_SUCCESS;
    }
    else {
        fprintf(stderr, "Cannot send %s event.\n", msg);
        return EXIT_FAILURE;
    }
}/*}}}*/
#/**********************************************************\ 
#
# Auto-Generated Plugin Configuration file
# for VideoPins
#
#\**********************************************************/

set(PLUGIN_NAME "VideoPins")
set(PLUGIN_PREFIX "VPI")
set(COMPANY_NAME "WoW")

# ActiveX constants:
set(FBTYPELIB_NAME VideoPinsLib)
set(FBTYPELIB_DESC "VideoPins 1.0 Type Library")
set(IFBControl_DESC "VideoPins Control Interface")
set(FBControl_DESC "VideoPins Control Class")
set(IFBComJavascriptObject_DESC "VideoPins IComJavascriptObject Interface")
set(FBComJavascriptObject_DESC "VideoPins ComJavascriptObject Class")
set(IFBComEventSource_DESC "VideoPins IFBComEventSource Interface")
set(AXVERSION_NUM "1")

# NOTE: THESE GUIDS *MUST* BE UNIQUE TO YOUR PLUGIN/ACTIVEX CONTROL!  YES, ALL OF THEM!
set(FBTYPELIB_GUID a662ae2a-d382-539d-8b2f-944d9987a81b)
set(IFBControl_GUID 6f2180e6-0087-578f-b82f-bee3ef3d2f8b)
set(FBControl_GUID 90fc56cd-b9e6-5196-886e-19e139911c71)
set(IFBComJavascriptObject_GUID 05c1009f-bb42-5302-adca-9de449f09460)
set(FBComJavascriptObject_GUID 83c34808-3f31-584f-be7a-df66810255af)
set(IFBComEventSource_GUID 60069c58-a771-5d8d-b06f-c99940beb0dc)

# these are the pieces that are relevant to using it from Javascript
set(ACTIVEX_PROGID "WoW.VideoPins")
set(MOZILLA_PLUGINID "Lighthead.com/VideoPins")

# strings
set(FBSTRING_CompanyName "Lighthead")
set(FBSTRING_PluginDescription "VideoPins for linux.")
set(FBSTRING_PLUGIN_VERSION "1.0.0.0")
set(FBSTRING_LegalCopyright "Copyright 2012 Lighthead")
set(FBSTRING_PluginFileName "np${PLUGIN_NAME}.dll")
set(FBSTRING_ProductName "VideoPins")
set(FBSTRING_FileExtents "")
set(FBSTRING_PluginName "VideoPins")
set(FBSTRING_MIMEType "application/x-videopins")

# Uncomment this next line if you're not planning on your plugin doing
# any drawing:

#set (FB_GUI_DISABLED 1)

# Mac plugin settings. If your plugin does not draw, set these all to 0
set(FBMAC_USE_QUICKDRAW 0)
set(FBMAC_USE_CARBON 1)
set(FBMAC_USE_COCOA 1)
set(FBMAC_USE_COREGRAPHICS 1)
set(FBMAC_USE_COREANIMATION 0)
set(FBMAC_USE_INVALIDATINGCOREANIMATION 0)

# If you want to register per-machine on Windows, uncomment this line
#set (FB_ATLREG_MACHINEWIDE 1)

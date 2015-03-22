function getObjectValue(i_handle, i_key, i_callback)
{
  i_callback( getObjectValueAs3(i_handle, i_key) );
}


function getObjectHandle(i_handle, i_key, i_callback)
{
  i_callback( getObjectHandleAs3(i_handle, i_key) );
}



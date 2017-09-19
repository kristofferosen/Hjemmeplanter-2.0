function sendData()

    print(wifi.sta.getip())

    erlend = node.chipid()
    westbye = adc.read(0)

    print(westbye)
    
    mystring = string.format('{"chipcode":"%f","soilMoisture":"%f"}', erlend , westbye)
    
    --print(mystring)
    
    http.post('http://40.69.89.94:8080/api/plant',
      'Content-Type: application/json\r\n',
      mystring,
      function(code, data)
        if (code < 0) then
          --print("HTTP request failed")
          node.dsleep(1 * 60 * 1000000)--sleep 1 minute and retry
        else
          print(code, data)
          node.dsleep(30 * 60 * 1000000)--sleep 30 minutes
        end
      end)
end

sendData()

--node.dsleep(0.2 * 60 * 1000000)


```sh
CREATE OR REPLACE FUNCTION notify_invoice_delete() RETURNS TRIGGER AS $$
BEGIN
    PERFORM pg_notify('invoice_deleted', row_to_json(OLD)::text);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
``` 

```sh
CREATE TRIGGER invoice_delete_trigger
AFTER DELETE ON c_invoice
FOR EACH ROW
EXECUTE FUNCTION notify_invoice_delete();
```
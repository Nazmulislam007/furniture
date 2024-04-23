import { CustomMenuItem, CustomSelect } from "@/assets/Custom/selectiStyle";
import { IOSSwitch } from "@/assets/Custom/switchStyle";
import { apiUrl } from "@/Context/constant";
import { deleteCustomer } from "@/Context/CustomersProvider/action";
import useToast from "@/lib/hook/useToast";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, Stack, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DashboardTableRow({ cus, dispatch }) {
  const toast = useToast();
  const copyIdRef = useRef(null);
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(window.sessionStorage.getItem("user"))
      : null;

  const [state, setState] = useState({
    status: false,
    goto: false,
  });

  const [uniqueUrl, setUniqueUrl] = useState("");

  // get unique url
  useEffect(() => {
    async function getUrl() {
      try {
        const url = `${apiUrl}/api/getUniqueUrl?customer_id=${cus?.id}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.length > 0) {
          setUniqueUrl(
            `${window.location.origin}/${data[0].url}/${data[0].customer_id}`
          );
        } else {
          setUniqueUrl(`sub.domain.com/${cus?.id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUrl();
  }, [cus?.id]);

  useEffect(() => {
    async function getStatusGoto() {
      try {
        const url = `${apiUrl}/api/getLandingpageId?customer_id=${cus?.id}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data?.[0]) {
          setState((prev) => ({
            ...prev,
            status: data[0].status === 1 ? true : false,
            goto: data[0].goto === 1 ? true : false,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStatusGoto();
  }, [cus?.id]);

  const handleChange = async (e) => {
    if (!currentUser?.id) return alert("Please login to add toggle status.");
    setState({ ...state, [e.target.name]: e.target.checked });

    // toggle status in database.
    const url = `${apiUrl}/api/toggleStatus`;
    try {
      await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: cus?.id,
          [e.target.name]: e.target.checked,
          ...(e.target.name === "goto" && {
            landingpage_id: cus?.page.toLowerCase(),
          }),
        }),
      });
    } catch (error) {
      console.log("Failed to toggle status: ", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure to delete this customer?"
    );

    if (userConfirmed) {
      // dispatch(deleteCustomer(id));
      const url = `${apiUrl}/api/deleteCustomer`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await response.json();
        alert(data.message);
      } catch (error) {
        console.log("Error deleting customer:", error);
      }
    }
  };

  // handle copyClick
  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(copyIdRef.current.textContent);
    toast("URL copied", "#2ecc71");
  };

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "&:hover": { background: "#f2f2f2" },
      }}
    >
      <TableCell>
        <IOSSwitch
          sx={{ marginTop: 2 }}
          name="status"
          checked={state.status}
          onChange={handleChange}
        />
        <Typography component="span" display="block" mt="5px">
          {cus?.id}
        </Typography>
      </TableCell>
      <TableCell>{cus?.first_name}</TableCell>
      <TableCell>{cus?.last_name}</TableCell>
      <TableCell>{cus?.email}</TableCell>
      <TableCell>{cus?.phone}</TableCell>
      <TableCell>{cus?.city}</TableCell>
      <TableCell>
        <Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <div ref={copyIdRef}>{uniqueUrl}</div>
            <CopyAllIcon sx={{ cursor: "pointer" }} onClick={handleCopyClick} />
            <Link href="/dashboard/customer-cart">
              <Button
                variant="contained"
                color="secondary"
                sx={{ minWidth: 10, padding: "8px", marginLeft: "auto" }}
              >
                <ShoppingCartIcon />
              </Button>
            </Link>

            <Link
              href={{
                pathname: `/dashboard/create-customer`,
                query: { id: cus?.id },
              }}
            >
              <Button
                variant="contained"
                color="warning"
                sx={{ minWidth: 10, padding: "8px" }}
              >
                <BorderColorIcon />
              </Button>
            </Link>
            <Button
              variant="contained"
              color="error"
              sx={{ minWidth: 10, padding: "8px" }}
              onClick={() => handleDeleteCustomer(cus?.id)}
            >
              <DeleteIcon />
            </Button>
          </Stack>
          <Typography component="span" fontSize={12}>
            URL should go to
          </Typography>
          <Stack direction="row" spacing={1}>
            <CustomSelect
              disableUnderline
              variant="standard"
              value={cus?.page}
              sx={{ maxWidth: 170, flex: 1 }}
            >
              <CustomMenuItem value={cus?.page}>{cus?.page}</CustomMenuItem>
            </CustomSelect>
            <IOSSwitch
              name="goto"
              checked={state.goto}
              onChange={handleChange}
            />
          </Stack>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
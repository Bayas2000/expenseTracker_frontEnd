import React from "react";
import api from "../../api/api";
import { useDispatch } from "react-redux";
import { ListInvestmentDetails } from "../../Store/Groups/groupsList";
import { toast } from "react-toastify";
import Select from "react-select";


const AddTransaction = ({ groupDetails, showModal, setShowModal, groupId }) => {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [amount, setAmount] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [notes, setNotes] = React.useState('');

  console.log(groupDetails , 'groupDetails');
  console.log(date , 'date');

  const membersOption = groupDetails && groupDetails.length > 0 ?
  groupDetails.map((data) => {
    return {
        value:data._id,
        label:data.memberName
    }
  })
  : []
  

  const handleAddTransaction = () => {
    if (!members) {
      alert("Please fill in all fields");
      return;
    }

    const payload = [{
      groupId: groupId,
      memberId: members.value,
      amount: Number(amount),
      notes:notes,
      investmentDate: date
    }];

    api
      .post("/investment/create-many", payload)
      .then((res) => {
        dispatch(ListInvestmentDetails());
        toast.success("Transaction added successfully");
        setShowModal(false);
        setMembers("");
        setDate(null)
        setNotes('')
        setAmount("");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };
  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>

            <div className=" grid grid-cols-2 gap-x-4 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  select Member
                </label>
                <Select  
                size={'small'}
                options ={membersOption}
                value = {members}
                onChange ={(selectedOption) => setMembers(selectedOption)}
                className='text-sm'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input  
                size={'small'}
                value={amount}
                 onChange={(e) => setAmount(e.target.value)}
                type='number'
                className='p-[6px] py-2 border-[1.5px] w-full border-gray-300 rounded-[5px] text-sm'
                placeholder='Enter the Amount'
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Date
                </label>
                <input  
                size={'small'}
                type='date'
                className='p-[6px] border-[1.5px] w-full py-2 border-gray-300 rounded-[5px] text-sm'
                placeholder='Enter the Amount'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
              </div>
             
            </div>
             <div className='mt-3'>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea  
                size={'small'}
                type='text'
                className='p-[6px] border-[1.5px] w-full py-2 border-gray-300 rounded-[5px] text-sm'
                placeholder='Enter the Notes'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                />
              </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTransaction;
